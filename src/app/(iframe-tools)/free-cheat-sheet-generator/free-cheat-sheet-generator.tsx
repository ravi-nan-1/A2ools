
"use client";

export function FreeCheatSheetGenerator() {
  const toolUrl = 'https://summary.all2ools.com/';

  return (
    <iframe
      src={toolUrl}
      className="w-full h-full border-0"
      style={{ height: '100vh' }}
      title="Free Cheat Sheet Generator"
      allow="fullscreen"
    />
  );
}
