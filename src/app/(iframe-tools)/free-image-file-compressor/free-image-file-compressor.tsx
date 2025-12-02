
"use client";

export function FreeImageFileCompressor() {
  const toolUrl = 'https://imagecompressor.all2ools.com/';

  return (
    <iframe
      src={toolUrl}
      className="w-full h-full border-0"
      style={{ height: '100vh' }}
      title="Free Image/File Compressor"
      allow="fullscreen"
    />
  );
}
