import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Achu Asokan — Full Stack Developer & Software Engineer",
  description:
    "Tactile personal portfolio of Achu Asokan — Full Stack Developer specializing in Next.js, React, Node.js, TypeScript, and modern UI engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Newsreader:ital,opsz,wght@0,6..72,200..700;1,6..72,200..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
