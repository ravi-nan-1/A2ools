
'use client';
import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { 
  FileUp, 
  Loader2, 
  File as FileIcon, 
  X, 
  Image as ImageIcon,
  Download,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';


type CompressionStatus = 'idle' | 'file-selected' | 'compressing' | 'done' | 'error';

interface CompressedFile {
  blob: Blob;
  name: string;
  originalSize: number;
  compressedSize: number;
}

export default function Compressor() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<CompressionStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [compressedFile, setCompressedFile] = useState<CompressedFile | null>(null);
  const [quality, setQuality] = useState(75);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
      if(selectedFiles.length === 0) {
        toast({
          title: 'Invalid File Type',
          description: 'Please select image files only.',
          variant: 'destructive',
        });
        return;
      }
      setFiles(selectedFiles);
      setStatus('file-selected');
    }
  };

  const resetState = () => {
    setFiles([]);
    setStatus('idle');
    setProgress(0);
    setCompressedFile(null);
  };

  const handleCompress = async () => {
    if (files.length === 0) return;

    setStatus('compressing');
    setProgress(0);

    const animateProgress = () => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + 5;
        });
      }, 200);
      return interval;
    };

    const progressInterval = animateProgress();

    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('quality', quality.toString());
      
      // In a real app, you'd post to an API endpoint
      // For this example, we'll simulate compression client-side
      const originalFile = files[0];
      const compressedBlob = await new Promise<Blob>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(originalFile);
        reader.onload = (event) => {
          const img = document.createElement('img');
          img.src = event.target?.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve(blob);
                } else {
                  reject(new Error('Canvas to Blob conversion failed'));
                }
              },
              originalFile.type,
              quality / 100
            );
          };
        };
      });

      clearInterval(progressInterval);
      setProgress(100);

      setCompressedFile({
        blob: compressedBlob,
        name: `compressed-${originalFile.name}`,
        originalSize: originalFile.size,
        compressedSize: compressedBlob.size,
      });

      setStatus('done');
      toast({
        title: 'Compression Successful!',
        description: 'Your image has been compressed.',
      });

    } catch (error) {
      clearInterval(progressInterval);
      setStatus('error');
      toast({
        title: 'Compression Error',
        description: 'Something went wrong during compression.',
        variant: 'destructive',
      });
      setTimeout(() => {
        setStatus('file-selected');
      }, 3000);
    }
  };

  const handleDownload = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = compressedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <Card className='w-full max-w-lg mx-auto'>
      <CardContent className='p-6'>
        {status === 'idle' && (
          <div className='relative border-2 border-dashed border-border rounded-lg p-10 text-center hover:border-primary transition-colors'>
            <FileUp className='mx-auto h-12 w-12 text-muted-foreground' />
            <p className='mt-4 font-semibold'>Drop your image here</p>
            <p className='text-sm text-muted-foreground'>or click to browse</p>
            <Input
              id='file-upload'
              type='file'
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              onChange={handleFileChange}
              accept='image/*'
            />
          </div>
        )}

        {(status === 'file-selected' || status === 'compressing' || status === 'done' || status === 'error') && files[0] && (
          <div className='space-y-4'>
            <div className='border rounded-lg p-4 flex items-center justify-between bg-secondary/50'>
              <div className='flex items-center gap-3'>
                <ImageIcon className='h-8 w-8 text-primary' />
                <div>
                  <p className='font-medium text-sm'>{files[0].name}</p>
                  <p className='text-xs text-muted-foreground'>{formatBytes(files[0].size)}</p>
                </div>
              </div>
              <Button variant='ghost' size='icon' onClick={resetState}>
                <X className='h-4 w-4' />
              </Button>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='quality'>Quality: {quality}</Label>
              <Slider 
                id='quality'
                min={10} 
                max={90} 
                step={5} 
                value={[quality]} 
                onValueChange={(value) => setQuality(value[0])} 
                disabled={status === 'compressing'}
              />
            </div>

            {status === 'compressing' && (
              <div className='space-y-2 text-center'>
                <Progress value={progress} className='w-full' />
                <p className='text-sm text-muted-foreground animate-pulse'>Compressing... {progress}%</p>
              </div>
            )}
            
            {status === 'file-selected' && (
              <Button onClick={handleCompress} className='w-full' size='lg' >
                <Sparkles className='mr-2 h-4 w-4' />
                Compress Image
              </Button>
            )}

            {status === 'done' && compressedFile && (
               <div>
                <div className='border rounded-lg p-4 flex items-center justify-between bg-green-500/10'>
                  <div className='flex items-center gap-3'>
                    <ImageIcon className='h-8 w-8 text-green-600' />
                    <div>
                      <p className='font-medium text-sm'>{compressedFile.name}</p>
                      <p className='text-xs text-green-700'>
                        {formatBytes(compressedFile.compressedSize)} - 
                        <span className='font-bold'>
                          {Math.round(100 - (compressedFile.compressedSize / compressedFile.originalSize) * 100)}% smaller
                        </span>
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleDownload} size='icon'>
                    <Download className='h-5 w-5' />
                  </Button>
                </div>
                <Button onClick={resetState} className='w-full mt-4' variant='outline'>Compress Another</Button>
               </div>
            )}
            {status === 'error' && (
               <p className='text-center text-red-500 text-sm'>Something went wrong. Please try again.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
