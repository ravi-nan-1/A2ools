import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { QRConfig } from "@/types/qr";
import { Button } from "@/components/ui/button";

interface DesignTabProps {
  config: QRConfig;
  setConfig: (config: QRConfig) => void;
}

const colorPresets = [
  { name: "Classic", fg: "#000000", bg: "#ffffff" },
  { name: "Ocean", fg: "#0891b2", bg: "#f0f9ff" },
  { name: "Forest", fg: "#059669", bg: "#f0fdf4" },
  { name: "Sunset", fg: "#dc2626", bg: "#fef2f2" },
  { name: "Purple", fg: "#7c3aed", bg: "#faf5ff" },
  { name: "Gold", fg: "#ca8a04", bg: "#fefce8" },
];

export const DesignTab = ({ config, setConfig }: DesignTabProps) => {
  const updateDesign = (field: keyof QRConfig, value: any) => {
    setConfig({ ...config, [field]: value });
  };

  const applyPreset = (fg: string, bg: string) => {
    setConfig({ ...config, fgColor: fg, bgColor: bg });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fgColor">Foreground Color</Label>
          <div className="flex gap-2">
            <Input
              id="fgColor"
              type="color"
              value={config.fgColor}
              onChange={(e) => updateDesign("fgColor", e.target.value)}
              className="w-20 h-10 cursor-pointer"
            />
            <Input
              type="text"
              value={config.fgColor}
              onChange={(e) => updateDesign("fgColor", e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bgColor">Background Color</Label>
          <div className="flex gap-2">
            <Input
              id="bgColor"
              type="color"
              value={config.bgColor}
              onChange={(e) => updateDesign("bgColor", e.target.value)}
              className="w-20 h-10 cursor-pointer"
            />
            <Input
              type="text"
              value={config.bgColor}
              onChange={(e) => updateDesign("bgColor", e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Color Presets</Label>
        <div className="grid grid-cols-3 gap-2">
          {colorPresets.map((preset) => (
            <Button
              key={preset.name}
              variant="outline"
              size="sm"
              onClick={() => applyPreset(preset.fg, preset.bg)}
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <div className="flex gap-1">
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: preset.fg }}
                />
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: preset.bg }}
                />
              </div>
              <span className="text-xs">{preset.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="p-3 bg-accent/5 border-accent/20 rounded-lg">
        <p className="text-xs text-muted-foreground">
          🎨 Pro Tip: Ensure good contrast between colors for better scanning
        </p>
      </div>
    </div>
  );
};