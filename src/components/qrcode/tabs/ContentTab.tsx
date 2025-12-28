import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QRConfig } from "../types";
import { Globe, Type, Mail, Phone, MessageSquare, Wifi, User, MapPin, Bitcoin, Twitter, Facebook, File, Music, Store, Image, Barcode } from "lucide-react";

interface ContentTabProps {
  config: QRConfig;
  setConfig: (config: QRConfig) => void;
}

const typeIcons = {
  url: Globe,
  text: Type,
  email: Mail,
  phone: Phone,
  sms: MessageSquare,
  wifi: Wifi,
  vcard: User,
  location: MapPin,
  bitcoin: Bitcoin,
  twitter: Twitter,
  facebook: Facebook,
  pdf: File,
  mp3: Music,
  appstore: Store,
  image: Image,
  barcode: Barcode,
};

export const ContentTab = ({ config, setConfig }: ContentTabProps) => {
  const updateContent = (field: keyof QRConfig, value: any) => {
    setConfig({ ...config, [field]: value });
  };

  const renderContentInput = () => {
    switch (config.type) {
      case "url":
        return (
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={config.content}
              onChange={(e) => updateContent("content", e.target.value)}
            />
          </div>
        );
      case "text":
        return (
          <div className="space-y-2">
            <Label htmlFor="text">Text Content</Label>
            <Textarea
              id="text"
              placeholder="Enter your text here..."
              value={config.content}
              onChange={(e) => updateContent("content", e.target.value)}
              rows={4}
            />
          </div>
        );
      case "email":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="contact@example.com"
                value={config.content.split("?")[0].replace("mailto:", "")}
                onChange={(e) => updateContent("content", `mailto:${e.target.value}`)}
              />
            </div>
          </div>
        );
      case "phone":
        return (
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1234567890"
              value={config.content.replace("tel:", "")}
              onChange={(e) => updateContent("content", `tel:${e.target.value}`)}
            />
          </div>
        );
      case "sms":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sms-number">Phone Number</Label>
              <Input
                id="sms-number"
                type="tel"
                placeholder="+1234567890"
                value={config.content.split(":")[1]?.split("?")[0] || ""}
                onChange={(e) => updateContent("content", `sms:${e.target.value}`)}
              />
            </div>
          </div>
        );
      case "wifi":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wifi-ssid">Network Name (SSID)</Label>
              <Input
                id="wifi-ssid"
                placeholder="MyWiFi"
                defaultValue="MyWiFi"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wifi-password">Password</Label>
              <Input
                id="wifi-password"
                type="password"
                placeholder="password123"
                defaultValue=""
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wifi-type">Security Type</Label>
              <Select defaultValue="WPA">
                <SelectTrigger id="wifi-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "vcard":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vcard-name">Full Name</Label>
              <Input
                id="vcard-name"
                placeholder="John Doe"
                defaultValue="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vcard-email">Email</Label>
              <Input
                id="vcard-email"
                type="email"
                placeholder="john@example.com"
                defaultValue=""
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vcard-phone">Phone</Label>
              <Input
                id="vcard-phone"
                type="tel"
                placeholder="+1234567890"
                defaultValue=""
              />
            </div>
          </div>
        );
      case "location":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location-lat">Latitude</Label>
              <Input
                id="location-lat"
                type="number"
                step="any"
                placeholder="40.7128"
                defaultValue="40.7128"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location-lng">Longitude</Label>
              <Input
                id="location-lng"
                type="number"
                step="any"
                placeholder="-74.0060"
                defaultValue="-74.0060"
              />
            </div>
          </div>
        );
        case "bitcoin":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bitcoin-address">Bitcoin Address</Label>
              <Input
                id="bitcoin-address"
                placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bitcoin-amount">Amount</Label>
              <Input
                id="bitcoin-amount"
                type="number"
                step="any"
                placeholder="0.1"
              />
            </div>
          </div>
        );
      case "twitter":
        return (
          <div className="space-y-2">
            <Label htmlFor="twitter-url">Twitter Profile URL</Label>
            <Input
              id="twitter-url"
              placeholder="https://twitter.com/username"
            />
          </div>
        );
      case "facebook":
        return (
          <div className="space-y-2">
            <Label htmlFor="facebook-url">Facebook Profile URL</Label>
            <Input
              id="facebook-url"
              placeholder="https://facebook.com/username"
            />
          </div>
        );
      case "pdf":
        return (
          <div className="space-y-2">
            <Label htmlFor="pdf-file">PDF File</Label>
            <Input id="pdf-file" type="file" accept=".pdf" />
          </div>
        );
      case "mp3":
        return (
          <div className="space-y-2">
            <Label htmlFor="mp3-file">MP3 File</Label>
            <Input id="mp3-file" type="file" accept=".mp3" />
          </div>
        );
      case "appstore":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="appstore-apple">Apple App Store URL</Label>
              <Input
                id="appstore-apple"
                placeholder="https://apps.apple.com/app/id123456789"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="appstore-google">Google Play Store URL</Label>
              <Input
                id="appstore-google"
                placeholder="https://play.google.com/store/apps/details?id=com.example.app"
              />
            </div>
          </div>
        );
      case "image":
        return (
          <div className="space-y-2">
            <Label htmlFor="image-file">Image File</Label>
            <Input id="image-file" type="file" accept="image/*" />
          </div>
        );
      case "barcode":
        return (
          <div className="space-y-2">
            <Label htmlFor="barcode-data">Barcode Data</Label>
            <Input id="barcode-data" placeholder="123456789012" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="type">QR Code Type</Label>
        <Select
          value={config.type}
          onValueChange={(value) => updateContent("type", value)}
        >
          <SelectTrigger id="type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(typeIcons).map(([key, Icon]) => (
              <SelectItem key={key} value={key}>
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="capitalize">{key}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {renderContentInput()}

      <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
        <p className="text-xs text-muted-foreground">
          💡 Tip: Keep your content concise for better scanning reliability
        </p>
      </div>
    </div>
  );
};
