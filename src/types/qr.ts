export interface QRConfig {
    size: number;
    margin: number;
    foregroundColor: string;
    backgroundColor: string;
    logoUrl?: string;
    logoSize?: number;
    errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  }
  