import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut } from "lucide-react";
import { QRConfig } from "./types";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Separator } from "@/components/ui/separator";

interface QRPreviewPanelProps {
  config: QRConfig;
}

export const QRPreviewPanel = ({ config }: QRPreviewPanelProps) => {
  const qrCanvasRef = useRef<HTMLDivElement>(null);
  const qrSvgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(100);
  const { toast } = useToast();

  const downloadQR = async (format: "png" | "jpg" | "svg" | "pdf") => {
    if (format === "pdf") {
      const canvas = await html2canvas(qrCanvasRef.current as HTMLElement, { 
        backgroundColor: null, // Use transparent background
        scale: 3, // Higher scale for better quality
      });

      try {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });

        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("qrcode.pdf");

        toast.success({
          title: "Downloaded as PDF",
          description: "Your QR code has been successfully saved as a PDF file.",
        });

      } catch (error) {
        toast.error({
          title: "Download Failed",
          description: "An unexpected error occurred while trying to generate the PDF.",
        });
        console.error("PDF Generation error:", error);
      }
      return;
    }

    if (format === "svg") {
      if (qrSvgRef.current) {
        try {
          const svgString = new XMLSerializer().serializeToString(qrSvgRef.current);
          const blob = new Blob([svgString], { type: "image/svg+xml" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = "qrcode.svg";
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          toast.success({
            title: "Downloaded as SVG",
            description: "Your QR code has been successfully saved as an SVG file.",
          });
        } catch (error) {
          toast.error({
            title: "Download Failed",
            description: "An unexpected error occurred while trying to download the SVG.",
          });
          console.error("SVG Download error:", error);
        }
      } else {
        toast.error({
          title: "SVG not found",
          description: "Could not find the SVG element to download.",
        });
      }
      return;
    }

    const canvas = qrCanvasRef.current?.querySelector("canvas");
    if (!canvas) {
      toast.error({
        title: "QR code not found",
        description: "Could not find the QR code canvas element to download.",
      });
      return;
    }

    try {
      const mimeType = `image/${format}`;
      const dataUrl = canvas.toDataURL(mimeType, 1.0);
      const link = document.createElement("a");
      link.download = `qrcode.${format}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success({
        title: `Downloaded as ${format.toUpperCase()}`,
        description: `Your QR code has been successfully saved as a ${format.toUpperCase()} file.`,
      });

    } catch (error) {
      toast.error({
        title: "Download Failed",
        description: `An unexpected error occurred while trying to download the ${format.toUpperCase()}.`,
      });
      console.error(`${format.toUpperCase()} Download error:`, error);
    }
  };
  
  const qrCodeProps = {
    value: config.content || "https://example.com",
    size: config.size,
    bgColor: config.bgColor,
    fgColor: config.fgColor,
    level: config.errorCorrection,
    marginSize: config.margin,
    imageSettings: config.logo
      ? {
          src: config.logo,
          height: (config.size * config.logoSize) / 100,
          width: (config.size * config.logoSize) / 100,
          excavate: true,
        }
      : undefined,
  };

  return (
    <Card className="p-6 glass">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Live Preview</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              disabled={zoom <= 50}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground min-w-[60px] text-center">
              {zoom}%
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setZoom(Math.min(150, zoom + 10))}
              disabled={zoom >= 150}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div
          className="flex items-center justify-center min-h-[400px] bg-muted/20 rounded-lg border-2 border-dashed border-border p-8"
          role="img"
          aria-label="free qr code generator online preview"
        >
          <div
            ref={qrCanvasRef}
            style={{
              transform: `scale(${zoom / 100})`,
              transition: "transform 0.3s ease",
            }}
          >
            <QRCodeCanvas {...qrCodeProps} />
          </div>
          <div style={{ display: 'none' }}>
             <QRCodeSVG {...qrCodeProps} ref={qrSvgRef} />
          </div>
        </div>
        
        <Separator />

        <div className="space-y-3">
          <p className="text-sm font-medium">Export Options</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => downloadQR("png")}
              className="w-full gradient-primary"
            >
              <Download className="w-4 h-4 mr-2" />
              PNG
            </Button>
            <Button
              onClick={() => downloadQR("jpg")}
              variant="outline"
            >
              <Download className="w-4 h-4 mr-2" />
              JPG
            </Button>
            <Button
              onClick={() => downloadQR("svg")}
              variant="outline"
            >
              <Download className="w-4 h-4 mr-2" />
              SVG
            </Button>
            <Button
              onClick={() => downloadQR("pdf")}
              variant="outline"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>

        <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            ✨ Your QR code updates in real-time as you customize it.{' '}
            <strong>QR code free download</strong> in multiple formats!
          </p>
        </div>
      </div>
    </Card>
  );
};