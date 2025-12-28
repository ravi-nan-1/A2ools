import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { downloadBlob } from '@/lib/imageProcessing';
import { useToast } from '@/hooks/use-toast';
import ImageUploader from '../../ImageUploader';
import { motion } from 'framer-motion';

// Simplified status indicator for processing or error states
const StatusIndicator = ({ error, isProcessing }: { error: string | null; isProcessing: boolean }) => {
  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 text-destructive">
        <AlertTriangle className="w-8 h-8" />
        <p className="text-sm font-medium text-center">Error</p>
        <p className="text-xs text-center text-muted-foreground max-w-xs">{error}</p>
      </div>
    );
  }
  if (isProcessing) {
    return (
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground text-center">Removing background...</p>
      </div>
    );
  }
  return null;
};

const BackgroundRemover = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const { toast } = useToast();

  const resetState = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setIsProcessing(false);
    setError(null);
    setProcessedBlob(null);
  };

  const handleImageUpload = async (file: File) => {
    resetState();
    setOriginalImage(URL.createObjectURL(file));
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/remove-background', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = `API Error: ${response.statusText}`;
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          if (errorText) {
            errorMessage = errorText;
          }
        }
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
      setProcessedBlob(blob);

      toast({
        title: "Success!",
        description: "Background removed successfully.",
      });
    } catch (e: any) {
      console.error('Error removing background:', e);
      setError(e.message || 'An unknown error occurred during processing.');
      toast({
        title: "Error Removing Background",
        description: e.message || 'Please try again or use a different image.',
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedBlob) {
      downloadBlob(processedBlob, 'background-removed.png');
      toast({
        title: "Downloaded!",
        description: "Image saved to your downloads folder",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">AI Background Remover</h2>
        </div>
        <p className="text-muted-foreground">
          Instantly remove the background from any image with a single click.
        </p>
      </div>

      {!originalImage ? (
        <ImageUploader onImageUpload={handleImageUpload} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-4 items-start">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Original</p>
              <div className="rounded-2xl overflow-hidden border bg-muted/30 aspect-video flex items-center justify-center">
                <img src={originalImage} alt="Original" className="max-w-full max-h-full object-contain" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Result</p>
              <div className="rounded-2xl overflow-hidden border bg-gradient-to-br from-muted/30 to-muted/10 aspect-video flex items-center justify-center relative">
                {(isProcessing || error) && <StatusIndicator error={error} isProcessing={isProcessing} />}
                {processedImage && !error && (
                  <img src={processedImage} alt="Processed" className="max-w-full max-h-full object-contain" />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={resetState} variant="outline" size="lg">
              Start Over
            </Button>

            {processedImage && !error && (
              <Button
                onClick={handleDownload}
                size="lg"
                className="bg-gradient-primary text-primary-foreground hover:opacity-90"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BackgroundRemover;
