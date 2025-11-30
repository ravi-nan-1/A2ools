"use client";

import { Button } from '@/components/ui/button';
import { Image, ExternalLink } from 'lucide-react';

export function AiProductBackgroundRemover() {
  const toolUrl = 'https://image.all2ools.com';

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-muted rounded-lg h-64">
      <Image className="h-12 w-12 text-primary mb-4" />
      <h3 className="text-xl font-semibold mb-2">Launch the Background Remover</h3>
      <p className="text-muted-foreground max-w-sm mb-6">
        This powerful image tool runs in its own dedicated web application. Click the button below to open it in a new tab.
      </p>
      <Button asChild size="lg">
        <a href={toolUrl} target="_blank" rel="noopener noreferrer">
          Launch Image Tools
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  );
}
