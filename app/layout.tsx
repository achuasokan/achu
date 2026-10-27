import type { Metadata } from "next";
import "./globals.css";


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://achuasokan.fun';
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Achu Asokan — Full Stack Developer & Software Engineer",
    template: "Achu Asokan | %s",
  },
  description:
    "Portfolio of Achu Asokan, a Full Stack Developer and Software Engineer based in Kerala, India.",
  keywords: [
    "Achu Asokan",
    "Full Stack Developer",
    "Software Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Frontend Developer",
    "Web Developer Kerala",
    "Creative Developer",
    "UI/UX Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Achu Asokan", url: SITE_URL }],
  creator: "Achu Asokan",
  publisher: "Achu Asokan",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    siteName: "Achu Asokan",
    locale: "en_IN",
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: "/achuasokan-opengraph.webp",
        width: 1200,
        height: 630,
        alt: "Achu Asokan — Full Stack Developer & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/achuasokan-opengraph.webp"],
    creator: "@achuasokan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Achu Asokan",
      jobTitle: "Full Stack Developer & Software Engineer",
      url: SITE_URL,
      image: `${SITE_URL}/achu.webp`,
      sameAs: [
        "https://github.com/achuasokan",
        "https://linkedin.com/in/achu-a-4xd2y",
        "https://instagram.com/achu.asokan",
      ],
      description:
        "Full-stack developer and software engineer based in Kerala, India, building modern web and mobile applications.",
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Express.js",
        "NestJS",
        "MongoDB",
        "Docker",
        "Full Stack Web Development",
        "Mobile Applications",
        "UI/UX Design",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Achu Asokan Portfolio",
      description:
        "Personal portfolio of Achu Asokan — Full Stack Developer specializing in Next.js, React, Node.js, TypeScript, and modern UI engineering.",
      image: `${SITE_URL}/achuasokan-opengraph.webp`,
      publisher: {
        "@id": `${SITE_URL}/#person`,
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
