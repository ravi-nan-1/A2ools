"use client";

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

interface AdBannerProps extends React.HTMLAttributes<HTMLDivElement> {
    adSlot: string;
    adFormat?: string;
    dataFullWidthResponsive?: boolean;
}

export function AdBanner({ adSlot, adFormat = "auto", dataFullWidthResponsive = false, ...props }: AdBannerProps) {
  const pathname = usePathname();
  const adPushedRef = useRef(false);

  useEffect(() => {
    // When the path changes, we need to reset the ref so ads can be pushed again.
    adPushedRef.current = false;
  }, [pathname]);

  useEffect(() => {
    if (adPushedRef.current) return;

    try {
      if (window.adsbygoogle) {
        console.log('Pushing ad:', adSlot);
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adPushedRef.current = true;
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [pathname, adSlot]); // Re-run when pathname changes

  return (
    <div {...props} key={pathname + adSlot}>
        <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-3080938150148610"
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive={dataFullWidthResponsive.toString()}
            >
        </ins>
    </div>
  );
}
