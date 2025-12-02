"use client";

import React, { useEffect, useState } from 'react';
import { AdBanner } from './ad-banner';

interface DeferredAdBannerProps extends React.ComponentProps<typeof AdBanner> {}

export function DeferredAdBanner(props: DeferredAdBannerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Defer loading until after the initial mount and a short delay
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 1000); // 1-second delay to ensure critical content loads first

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    // Render a placeholder to prevent layout shift
    return <div className={props.className} style={props.style} />;
  }

  return <AdBanner {...props} />;
}
