import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Download, RefreshCw } from 'lucide-react';
import { convertImageFormat, downloadBlob, formatFileSize } from '@/lib/imageProcessing';
import { useToast } from '@/hooks/use-toast';
import ImageUploader from '../../ImageUploader';
import { motion } from 'framer-motion';

const ImageConverter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [format, setFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/png');
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setPreview(URL.createObjectURL(uploadedFile));
  };

  const getFileExtension = (mimeType: string): string => {
    const map: Record<string, string> = {
      'image/png': 'png',
      'image/jpeg': 'jpg',
      'image/webp': 'webp',
    };
    return map[mimeType] || 'png';
  };

  const handleConvert = async () => {
    if (!file) return;

    setProcessing(true);
    try {
      const blob = await convertImageFormat(file, format);
      const ext = getFileExtension(format);
      const filename = file.name.replace(/\.[^/.]+$/, `.${ext}`);
      downloadBlob(blob, filename);
      
      toast({
        title: "Success!",
        description: `Image converted to ${ext.toUpperCase()}`,
      });
    } catch (error) {
      console.error('Error converting image:', error);
      toast({
        title: "Error",
        description: "Failed to convert image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <RefreshCw className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Image Format Converter</h2>
        </div>
        <p className="text-muted-foreground">
          Convert images between PNG, JPG, and WEBP formats
        </p>
      </div>

      {!preview ? (
        <ImageUploader onImageUpload={handleImageUpload} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="rounded-2xl overflow-hidden border bg-muted/30 p-4">
            <img src={preview} alt="Preview" className="max-w-full max-h-96 mx-auto object-contain" />
          </div>

          <div className="bg-card rounded-2xl p-6 space-y-4 border">
            <Label className="text-base font-semibold">Convert to:</Label>
            <RadioGroup value={format} onValueChange={(value) => setFormat(value as any)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="image/png" id="png" />
                <Label htmlFor="png" className="cursor-pointer">PNG (Lossless, supports transparency)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="image/jpeg" id="jpeg" />
                <Label htmlFor="jpeg" className="cursor-pointer">JPG (Smaller file size, no transparency)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="image/webp" id="webp" />
                <Label htmlFor="webp" className="cursor-pointer">WEBP (Modern format, great compression)</Label>
              </div>
            </RadioGroup>

            {file && (
              <div className="text-sm text-muted-foreground pt-2 border-t">
                Original: {file.type.split('/')[1].toUpperCase()} • {formatFileSize(file.size)}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => {
                setFile(null);
                setPreview(null);
              }}
              variant="outline"
              size="lg"
            >
              Upload New Image
            </Button>
            
            <Button
              onClick={handleConvert}
              disabled={processing}
              size="lg"
              className="bg-gradient-primary text-primary-foreground hover:opacity-90"
            >
              <Download className="w-4 h-4 mr-2" />
              {processing ? 'Converting...' : 'Convert & Download'}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ImageConverter;
