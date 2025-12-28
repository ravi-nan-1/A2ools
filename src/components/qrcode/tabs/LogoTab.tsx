import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { QRConfig } from "../types";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface LogoTabProps {
  config: QRConfig;
  setConfig: (config: QRConfig) => void;
}

export const LogoTab = ({ config, setConfig }: LogoTabProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setConfig({ ...config, logo: reader.result as string });
          toast.success("Logo uploaded successfully");
        };
        reader.readAsDataURL(file);
      }
    },
    [config, setConfig]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
    maxFiles: 1,
    maxSize: 5242880, // 5MB
  });

  const removeLogo = () => {
    setConfig({ ...config, logo: null });
    toast.success("Logo removed");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Upload Logo</Label>
        {!config.logo ? (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {isDragActive
                ? "Drop the logo here..."
                : "Drag & drop logo or click to browse"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, SVG up to 5MB
            </p>
          </div>
        ) : (
          <div className="relative border rounded-lg p-4 bg-muted/20">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-background rounded border flex items-center justify-center overflow-hidden">
                <img
                  src={config.logo}
                  alt="Logo preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Logo uploaded</p>
                <p className="text-xs text-muted-foreground">
                  Adjust size below
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={removeLogo}
                className="text-destructive hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {config.logo && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Logo Size</Label>
              <span className="text-sm text-muted-foreground">
                {config.logoSize}%
              </span>
            </div>
            <Slider
              value={[config.logoSize]}
              onValueChange={([value]) =>
                setConfig({ ...config, logoSize: value })
              }
              min={10}
              max={50}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Recommended: 15-30% for optimal scanning
            </p>
          </div>
        </div>
      )}

      <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex gap-2">
          <ImageIcon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Adding a logo reduces scanning reliability. Use error correction
            level H for best results.
          </p>
        </div>
      </div>
    </div>
  );
};