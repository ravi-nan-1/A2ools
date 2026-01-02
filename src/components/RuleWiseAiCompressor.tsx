
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
  FileText,
  FileArchive,
  Film,
  Download,
  Gem,
  Sparkles,
  Zap,
  Languages,
  Eye,
  Settings
} from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type UploadedFile = {
  id: string;
  file: File;
  progress: number;
  originalSize: number;
  compressedSize: number | null;
  status: 'pending' | 'compressing' | 'done' | 'error';
  originalUrl: string;
  compressedUrl: string | null;
  compressedBlob: Blob | null;
};

const languages = [
    { code: 'en', name: 'English' }, { code: 'zh', name: 'Chinese' }, { code: 'es', name: 'Spanish' },
    { code: 'hi', name: 'Hindi' }, { code: 'ar', name: 'Arabic' }, { code: 'fr', name: 'French' },
    { code: 'bn', name: 'Bengali' }, { code: 'pt', name: 'Portuguese' }, { code: 'ru', name: 'Russian' },
    { code: 'ur', name: 'Urdu' }
];

const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <ImageIcon className="h-8 w-8 text-blue-500" />;
    if (fileType === 'application/pdf') return <FileText className="h-8 w-8 text-red-500" />;
    if (fileType.includes('document') || fileType.includes('word')) return <FileText className="h-8 w-8 text-blue-600" />;
    if (fileType.startsWith('video/')) return <Film className="h-8 w-8 text-purple-500" />;
    if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('7z')) return <FileArchive className="h-8 w-8 text-yellow-500" />;
    return <FileIcon className="h-8 w-8 text-gray-500" />;
};

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const compressImageClientSide = (file: File, mode: 'lossless' | 'quality' | 'max' | 'advanced', advancedOptions: { size: number, unit: 'KB' | 'MB' }): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
      const img = document.createElement('img');
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Could not get canvas context'));

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        let quality: number;
        switch(mode) {
          case 'lossless':
            quality = 0.95; // Near lossless for jpeg, png is handled separately
            break;
          case 'max':
            quality = 0.6; // Max compression for jpeg
            break;
          case 'advanced': {
            const targetBytes = advancedOptions.size * (advancedOptions.unit === 'MB' ? 1024 * 1024 : 1024);
            quality = Math.max(0.5, Math.min(0.95, 1 - (file.size - targetBytes) / file.size));
            break;
          }
          case 'quality':
          default:
            quality = 0.8; // Good quality for jpeg
            break;
        }

        // For PNG, canvas.toBlob is lossless by default. For other modes, we convert to JPEG.
        const outputMimeType = mode === 'lossless' && file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        
        canvas.toBlob(blob => {
          if (!blob) return reject(new Error('Canvas toBlob failed'));
          
          // If compression made it bigger (unlikely but possible), return original
          if (blob.size > file.size) {
            resolve(file);
          } else {
            resolve(blob);
          }
        }, outputMimeType, quality);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};


export function RuleWiseAiCompressor() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [compressionMode, setCompressionMode] = useState<'lossless' | 'quality' | 'max' | 'advanced'>('quality');
  const [advancedOptions, setAdvancedOptions] = useState({ size: 2, unit: 'MB' as 'KB' | 'MB' });
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = Array.from(selectedFiles).map(file => ({
      id: `${file.name}-${file.lastModified}`,
      file,
      progress: 0,
      originalSize: file.size,
      compressedSize: null,
      status: 'pending',
      originalUrl: URL.createObjectURL(file),
      compressedUrl: null,
      compressedBlob: null,
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    const fileToRemove = files.find(f => f.id === id);
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.originalUrl);
      if (fileToRemove.compressedUrl) {
        URL.revokeObjectURL(fileToRemove.compressedUrl);
      }
    }
    setFiles(prev => prev.filter(f => f.id !== id));
  }

  const startCompression = async (fileId: string) => {
    const fileIndex = files.findIndex(f => f.id === fileId);
    if(fileIndex === -1) return;

    setFiles(prev => prev.map(f => f.id === fileId ? {...f, status: 'compressing', progress: 25} : f));
    
    const fileToCompress = files[fileIndex];

    try {
        let compressedBlob: Blob;
        if (fileToCompress.file.type.startsWith('image/')) {
            setFiles(prev => prev.map(f => f.id === fileId ? {...f, progress: 50} : f));
            compressedBlob = await compressImageClientSide(fileToCompress.file, compressionMode, advancedOptions);
            setFiles(prev => prev.map(f => f.id === fileId ? {...f, progress: 75} : f));
        } else {
             toast({
                title: 'Unsupported File Type for Compression',
                description: `Client-side compression is only available for images. '${fileToCompress.file.name}' was not compressed.`,
                variant: 'destructive'
            });
            // For non-image files, we just use the original blob
            compressedBlob = fileToCompress.file;
        }
        
        if (compressedBlob.size >= fileToCompress.originalSize) {
             toast({
                title: 'Compression Notice',
                description: `Could not reduce file size for ${fileToCompress.file.name}. It may already be optimized.`,
                variant: 'default'
            })
        }
        
        const currentFile = files.find(f => f.id === fileId);

        if(currentFile?.compressedUrl) {
            URL.revokeObjectURL(currentFile.compressedUrl);
        }

        const compressedUrl = URL.createObjectURL(compressedBlob);

        setFiles(prev => prev.map(f => {
            if (f.id === fileId) {
                return {
                    ...f, 
                    progress: 100, 
                    status: 'done',
                    compressedSize: compressedBlob.size,
                    compressedUrl: compressedUrl,
                    compressedBlob: compressedBlob,
                };
            }
            return f;
        }));

    } catch(e) {
        console.error(e);
        const error = e as Error;
        toast({ title: 'Compression Failed', description: error.message || 'Something went wrong while compressing the file.', variant: 'destructive'});
        setFiles(prev => prev.map(f => f.id === fileId ? {...f, status: 'error'} : f));
    }
  }
  
  const compressAllFiles = async () => {
    const pendingFiles = files.filter(f => f.status === 'pending');
    if (pendingFiles.length === 0) {
        toast({ title: 'No files to compress', description: 'All files have already been processed.', variant: 'default' });
        return;
    }
    
    setIsCompressing(true);
    await Promise.all(pendingFiles.map(file => startCompression(file.id)));
    setIsCompressing(false);
    toast({ title: 'Batch Compression Complete', description: 'All files have been processed.'});
  }

  const downloadCompressedFile = (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (file && file.compressedUrl) {
        const link = document.createElement('a');
        link.href = file.compressedUrl;
        
        const originalName = file.file.name;
        const extensionIndex = originalName.lastIndexOf('.');
        const nameWithoutExtension = extensionIndex > 0 ? originalName.substring(0, extensionIndex) : originalName;
        
        let newExtension = 'compressed';
        if (file.compressedBlob?.type) {
            newExtension = file.compressedBlob.type.split('/')[1];
        }

        link.setAttribute('download', `${nameWithoutExtension}-compressed.${newExtension}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({ title: `Downloading compressed ${file.file.name}`});
    }
  }

  const downloadAllAsZip = async () => {
    const doneFiles = files.filter(f => f.status === 'done' && f.compressedBlob);
    if (doneFiles.length === 0) {
      toast({ title: 'No compressed files to download', variant: 'destructive' });
      return;
    }

    toast({ title: 'Preparing ZIP file for download...'});

    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();

    doneFiles.forEach(f => {
      if (f.compressedBlob) {
        const originalName = f.file.name;
        const extensionIndex = originalName.lastIndexOf('.');
        const nameWithoutExtension = extensionIndex > 0 ? originalName.substring(0, extensionIndex) : originalName;
        
        let newExtension = 'compressed';
        if (f.compressedBlob?.type) {
            newExtension = f.compressedBlob.type.split('/')[1];
        }

        zip.file(`${nameWithoutExtension}-compressed.${newExtension}`, f.compressedBlob);
      }
    });

    zip.generateAsync({ type: 'blob' }).then(content => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'compressed-files.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    });
  }

  const changeCompressionMode = (mode: 'lossless' | 'quality' | 'max' | 'advanced') => {
    setCompressionMode(mode);
  }
  
  const changeLanguage = (langCode: string) => {
    setCurrentLanguage(langCode);
    toast({ title: `Language changed to ${languages.find(l => l.code === langCode)?.name}` });
  }

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  useEffect(() => {
    return () => {
      files.forEach(f => {
        if (f.originalUrl) URL.revokeObjectURL(f.originalUrl);
        if (f.compressedUrl) URL.revokeObjectURL(f.compressedUrl);
      });
    };
  }, []); // Changed dependency to empty to only run on unmount
  
  const totalOriginalSize = files.reduce((acc, f) => acc + f.originalSize, 0);
  const totalCompressedSize = files.reduce((acc, f) => acc + (f.compressedSize ?? f.originalSize), 0);
  const allDone = files.length > 0 && files.every(f => f.status === 'done' || f.status === 'error');

  return (
    <>
    <Card className="shadow-2xl shadow-primary/10 border-primary/20 rounded-xl overflow-hidden">
      <div className="absolute top-4 right-4 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm"><Languages className="mr-2" /> {languages.find(l => l.code === currentLanguage)?.name}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Select Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={currentLanguage} onValueChange={changeLanguage}>
              {languages.map(lang => (
                 <DropdownMenuRadioItem key={lang.code} value={lang.code}>{lang.name}</DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CardContent className="p-2 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel: Upload & Options */}
          <div className="lg:col-span-1 space-y-6">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                multiple
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              <label
                htmlFor="file-upload"
                className={cn(
                  'flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors',
                  isDragging ? 'border-primary bg-primary/10' : 'border-border'
                )}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <FileUp className="w-10 h-10 mb-3 text-primary" />
                  <p className="mb-1 text-md font-semibold text-foreground">
                    <span className="text-primary">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">Image files supported</p>
                </div>
              </label>

              <h3 className="text-lg font-semibold text-center">Compression Mode</h3>
              <div className="grid grid-cols-1 gap-2">
                  <Button variant={compressionMode === 'lossless' ? 'default' : 'outline'} onClick={() => changeCompressionMode('lossless')} className="justify-start h-auto py-3">
                    <Gem className="mr-3"/> <div><p>Lossless Compression</p><p className="text-xs text-muted-foreground font-normal">No quality loss (PNG only).</p></div>
                  </Button>
                  <Button variant={compressionMode === 'quality' ? 'default' : 'outline'} onClick={() => changeCompressionMode('quality')} className="justify-start h-auto py-3">
                    <Sparkles className="mr-3"/> <div><p>High-Quality</p><p className="text-xs text-muted-foreground font-normal">Minimal quality loss.</p></div>
                  </Button>
                  <Button variant={compressionMode === 'max' ? 'default' : 'outline'} onClick={() => changeCompressionMode('max')} className="justify-start h-auto py-3">
                    <Zap className="mr-3"/> <div><p>Maximum Compression</p><p className="text-xs text-muted-foreground font-normal">Highest size reduction.</p></div>
                  </Button>
                  <Button variant={compressionMode === 'advanced' ? 'default' : 'outline'} onClick={() => changeCompressionMode('advanced')} className="justify-start h-auto py-3">
                    <Settings className="mr-3"/> <div><p>Advanced</p><p className="text-xs text-muted-foreground font-normal">Set a target file size.</p></div>
                  </Button>
              </div>
              
              {compressionMode === 'advanced' && (
                <div className="space-y-2 p-4 border rounded-lg bg-muted/50">
                  <label htmlFor="target-size" className="text-sm font-medium">Target Size</label>
                  <div className="flex gap-2">
                    <Input
                      id="target-size"
                      type="number"
                      value={advancedOptions.size}
                      onChange={(e) => setAdvancedOptions(prev => ({...prev, size: parseInt(e.target.value, 10) || 0}))}
                      className="w-full"
                    />
                    <Select
                      value={advancedOptions.unit}
                      onValueChange={(value: 'KB' | 'MB') => setAdvancedOptions(prev => ({...prev, unit: value}))}
                    >
                      <SelectTrigger className="w-[80px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KB">KB</SelectItem>
                        <SelectItem value="MB">MB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
          </div>

          {/* Right Panel: File List & Output */}
          <div className="lg:col-span-2 min-h-[30rem] bg-muted/30 rounded-lg p-4 flex flex-col">
            {files.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <ImageIcon className="h-16 w-16 mb-4" />
                    <p>Your uploaded files will appear here</p>
                </div>
            ) : (
                <div className="space-y-3 h-full flex flex-col">
                    <h3 className="text-lg font-semibold">File Queue ({files.length})</h3>
                    <div className="flex-1 overflow-y-auto pr-2">
                        <div className="space-y-2">
                        {files.map(f => (
                            <div key={f.id} className="bg-background p-3 rounded-lg shadow-sm border flex items-center gap-4">
                                {getFileIcon(f.file.type)}
                                <div className="flex-1">
                                    <p className="font-semibold text-sm truncate">{f.file.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatBytes(f.originalSize)}
                                        {f.status === 'done' && f.compressedSize !== null && (
                                            <>
                                                <span className="mx-1">→</span>
                                                {formatBytes(f.compressedSize)}
                                                <span className={cn(
                                                    'font-medium ml-2',
                                                    f.compressedSize < f.originalSize ? 'text-green-500' : 'text-yellow-500'
                                                )}>
                                                    (-{ f.originalSize > 0 ? (100 - (f.compressedSize/f.originalSize)*100).toFixed(0) : 0 }%)
                                                </span>
                                            </>
                                        )}
                                    </p>
                                    {(f.status === 'compressing' || f.status === 'pending') && <Progress value={f.progress} className="h-1 mt-1" />}
                                </div>
                                <div className='flex items-center gap-1'>
                                    {f.status === 'pending' && <Button size="sm" variant="ghost" onClick={() => startCompression(f.id)}>Compress</Button>}
                                    {f.status === 'compressing' && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
                                    {f.status === 'done' && (
                                        <>
                                            {f.file.type.startsWith('image/') && f.compressedUrl && <Button size="sm" variant="outline" onClick={() => setPreviewFile(f)}><Eye className="h-4 w-4 mr-2"/> Preview</Button>}
                                            <Button size="sm" onClick={() => downloadCompressedFile(f.id)}><Download className="h-4 w-4 mr-2"/> Download</Button>
                                        </>
                                    )}
                                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => removeFile(f.id)}><X className="h-4 w-4"/></Button>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className="mt-auto pt-4 border-t">
                      {allDone && totalCompressedSize > 0 && files.length > 0 && (
                          <div className="text-center mb-4 p-4 bg-green-500/10 rounded-lg">
                              <h4 className="font-bold text-green-700">Compression Complete!</h4>
                              <p className="text-sm text-green-600">
                                  Total saved: <span className="font-semibold">{formatBytes(totalOriginalSize)}</span> → <span className="font-semibold">{formatBytes(totalCompressedSize)}</span>
                                  <span className="ml-2 font-bold">({ totalOriginalSize > 0 ? (100 - (totalCompressedSize/totalOriginalSize)*100).toFixed(0) : 0 }%)</span>
                              </p>
                          </div>
                      )}
                      <div className="flex gap-2">
                        <Button size="lg" className="flex-1" onClick={compressAllFiles} disabled={isCompressing || files.length === 0}>
                            {isCompressing ? <Loader2 className="animate-spin mr-2" /> : <Zap className="mr-2" />}
                            Compress All ({files.filter(f => f.status === 'pending').length})
                        </Button>
                        <Button size="lg" className="flex-1" variant="outline" onClick={downloadAllAsZip} disabled={!allDone}>
                            <Download className="mr-2"/> Download All as ZIP
                        </Button>
                      </div>
                    </div>
                </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>

    {previewFile && (
      <Dialog open={!!previewFile} onOpenChange={(isOpen) => !isOpen && setPreviewFile(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Compression Preview</DialogTitle>
            <DialogDescription>{previewFile.file.name}</DialogDescription>
          </DialogHeader>
          {previewFile.file.type.startsWith('image/') && previewFile.compressedUrl ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-center font-semibold mb-2">Original ({formatBytes(previewFile.originalSize)})</h3>
                <div className="relative aspect-square w-full">
                  <Image src={previewFile.originalUrl} alt="Original" fill style={{ objectFit: 'contain' }} />
                </div>
              </div>
              <div>
                <h3 className="text-center font-semibold mb-2">Compressed ({formatBytes(previewFile.compressedSize!)})</h3>
                <div className="relative aspect-square w-full">
                  <Image src={previewFile.compressedUrl} alt="Compressed" fill style={{ objectFit: 'contain' }} />
                </div>
              </div>
            </div>
          ) : (
            <div className='space-y-4'>
                <div className='flex items-center justify-center p-8 bg-muted rounded-lg'>
                    {getFileIcon(previewFile.file.type)}
                </div>
                <div className='grid grid-cols-2 gap-4 text-center'>
                    <div>
                        <p className='text-muted-foreground'>Original Size</p>
                        <p className='text-lg font-semibold'>{formatBytes(previewFile.originalSize)}</p>
                    </div>
                    <div>
                        <p className='text-muted-foreground'>Compressed Size</p>
                        <p className='text-lg font-semibold'>{formatBytes(previewFile.compressedSize!)}</p>
                    </div>
                </div>
                <div className="text-center p-4 bg-green-500/10 rounded-lg">
                    <h4 className="font-bold text-green-700">Size Reduction</h4>
                    <p className="text-2xl text-green-600 font-bold">
                        { previewFile.originalSize > 0 && previewFile.compressedSize ? (100 - (previewFile.compressedSize/previewFile.originalSize)*100).toFixed(0) : 0 }%
                    </p>
                </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    )}
    </>
  );
}
