export interface QRConfig {
  type: "url" | "text" | "email" | "phone" | "sms" | "wifi" | "vcard" | "location" | "bitcoin" | "twitter" | "facebook" | "pdf" | "mp3" | "appstore" | "image" | "barcode";
  content: string;
  fgColor: string;
  bgColor: string;
  size: number;
  errorCorrection: "L" | "M" | "Q" | "H";
  logo: string | null;
  logoSize: number;
  margin: number;
}
