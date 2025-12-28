import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Download, Minimize2 } from 'lucide-react';
import { compressImage, downloadBlob, formatFileSize } from '@/lib/imageProcessing';
import { useToast } from '@/hooks/use-toast';
import ImageUploader from '../../ImageUploader';
import { motion } from 'framer-motion';

const ImageCompressor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setPreview(URL.createObjectURL(uploadedFile));
    setCompressedSize(null);
  };

  const handleCompress = async () => {
    if (!file) return;

    setProcessing(true);
    try {
      const blob = await compressImage(file, quality);
      setCompressedSize(blob.size);
      const filename = `compressed-${file.name}`;
      downloadBlob(blob, filename);
      
      const reduction = ((1 - blob.size / file.size) * 100).toFixed(1);
      toast({
        title: "Success!",
        description: `File size reduced by ${reduction}%`,
      });
    } catch (error) {
      console.error('Error compressing image:', error);
      toast({
        title: "Error",
        description: "Failed to compress image. Please try again.",
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
          <Minimize2 className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Image Compressor</h2>
        </div>
        <p className="text-muted-foreground">
          Reduce file size while maintaining visual quality
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

          <div className="bg-card rounded-2xl p-6 space-y-6 border">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Quality: {quality}%</Label>
                <span className="text-sm text-muted-foreground">
                  Higher = Better quality, Larger file
                </span>
              </div>
              <Slider
                value={[quality]}
                onValueChange={(value) => setQuality(value[0])}
                min={10}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            {file && (
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Original size:</span>
                  <span className="font-medium">{formatFileSize(file.size)}</span>
                </div>
                {compressedSize && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Compressed size:</span>
                      <span className="font-medium text-success">{formatFileSize(compressedSize)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Reduction:</span>
                      <span className="font-medium text-success">
                        {((1 - compressedSize / file.size) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => {
                setFile(null);
                setPreview(null);
                setCompressedSize(null);
              }}
              variant="outline"
              size="lg"
            >
              Upload New Image
            </Button>
            
            <Button
              onClick={handleCompress}
              disabled={processing}
              size="lg"
              className="bg-gradient-primary text-primary-foreground hover:opacity-90"
            >
              <Download className="w-4 h-4 mr-2" />
              {processing ? 'Compressing...' : 'Compress & Download'}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ImageCompressor;
