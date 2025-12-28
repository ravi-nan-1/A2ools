import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRConfig } from "./types";
import { ContentTab } from "./tabs/ContentTab";
import { DesignTab } from "./tabs/DesignTab";
import { LogoTab } from "./tabs/LogoTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { Palette, Image, Settings, FileText } from "lucide-react";

interface QROptionsPanelProps {
  config: QRConfig;
  setConfig: (config: QRConfig) => void;
}

export const QROptionsPanel = ({ config, setConfig }: QROptionsPanelProps) => {
  return (
    <Card className="p-4 h-fit glass">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="content" className="text-xs">
            <FileText className="w-4 h-4 mr-1" />
            Content
          </TabsTrigger>
          <TabsTrigger value="design" className="text-xs">
            <Palette className="w-4 h-4 mr-1" />
            Design
          </TabsTrigger>
          <TabsTrigger value="logo" className="text-xs">
            <Image className="w-4 h-4 mr-1" />
            Logo
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-xs">
            <Settings className="w-4 h-4 mr-1" />
            Options
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <ContentTab config={config} setConfig={setConfig} />
        </TabsContent>

        <TabsContent value="design" className="space-y-4">
          <DesignTab config={config} setConfig={setConfig} />
        </TabsContent>

        <TabsContent value="logo" className="space-y-4">
          <LogoTab config={config} setConfig={setConfig} />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <SettingsTab config={config} setConfig={setConfig} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};