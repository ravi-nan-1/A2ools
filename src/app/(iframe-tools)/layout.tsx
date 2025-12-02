import '../globals.css';

export default function IframeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="w-full h-screen">{children}</div>
      </body>
    </html>
  );
}
