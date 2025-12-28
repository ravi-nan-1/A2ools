import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QRConfig } from "../types";
import { Input } from "@/components/ui/input";

interface SettingsTabProps {
  config: QRConfig;
  setConfig: (config: QRConfig) => void;
}

export const SettingsTab = ({ config, setConfig }: SettingsTabProps) => {
  const updateSetting = (field: keyof QRConfig, value: any) => {
    setConfig({ ...config, [field]: value });
  };

  const sizePresets = [
    { label: "Small (256px)", value: 256 },
    { label: "Medium (512px)", value: 512 },
    { label: "Large (1024px)", value: 1024 },
    { label: "Extra Large (2048px)", value: 2048 },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="size">QR Code Size</Label>
        <Select
          value={config.size.toString()}
          onValueChange={(value) => updateSetting("size", parseInt(value))}
        >
          <SelectTrigger id="size">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sizePresets.map((preset) => (
              <SelectItem key={preset.value} value={preset.value.toString()}>
                {preset.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Current size: {config.size}×{config.size} pixels
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="custom-size">Custom Size (px)</Label>
        <Input
          id="custom-size"
          type="number"
          min={256}
          max={4096}
          step={64}
          value={config.size}
          onChange={(e) => updateSetting("size", parseInt(e.target.value) || 512)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="error-correction">Error Correction Level</Label>
        <Select
          value={config.errorCorrection}
          onValueChange={(value) => updateSetting("errorCorrection", value)}
        >
          <SelectTrigger id="error-correction">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="L">Low (7%) - Fastest</SelectItem>
            <SelectItem value="M">Medium (15%) - Balanced</SelectItem>
            <SelectItem value="Q">Quartile (25%) - Good</SelectItem>
            <SelectItem value="H">High (30%) - Best</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Higher levels allow the QR code to be read even if partially damaged
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Quiet Zone (Margin)</Label>
          <span className="text-sm text-muted-foreground">
            {config.margin} modules
          </span>
        </div>
        <Slider
          value={[config.margin]}
          onValueChange={([value]) => updateSetting("margin", value)}
          min={0}
          max={10}
          step={1}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          White space around the QR code (recommended: 4)
        </p>
      </div>

      <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
        <p className="text-xs text-muted-foreground">
          ⚙️ These settings affect scanning reliability and file size
        </p>
      </div>
    </div>
  );
};