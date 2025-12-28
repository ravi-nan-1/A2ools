
'use client';

import { useState, useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';

export function QrCodeGenerator() {
  const [qrValue, setQrValue] = useState('https://all2ools.com');
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      let downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Generate a QR Code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          value={qrValue}
          onChange={(e) => setQrValue(e.target.value)}
          placeholder="Enter text or URL"
          className="w-full"
        />
        <div ref={qrRef} className="flex justify-center p-4 bg-white rounded-lg">
           {qrValue && <QRCode value={qrValue} size={256} />} 
        </div>
        <Button onClick={downloadQRCode} className="w-full" disabled={!qrValue}>
          <Download className="mr-2 h-4 w-4" />
          Download QR Code
        </Button>
      </CardContent>
    </Card>
  );
}
