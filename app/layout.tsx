import type { Metadata } from "next";
import { Instrument_Serif, Newsreader } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://achuasokan.fun';
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Achu Asokan — Full Stack Software Engineer",
    template: "Achu Asokan | %s",
  },
  description:
    "Building fast, modern web and mobile apps. Turning ideas into production-ready products for clients.",
  keywords: [
    "Achu Asokan",
    "Full Stack Developer",
    "Software Engineer",
    "Full Stack Software Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "PostgreSQL",
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
        alt: "Achu Asokan — Full Stack Software Engineer",
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
      jobTitle: "Full Stack Software Engineer",
      url: SITE_URL,
      image: `${SITE_URL}/achu.webp`,
      email: "mailto:achuasokan.me@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
      nationality: "Indian",
      knowsLanguage: ["English", "Malayalam"],
      sameAs: [
        "https://github.com/achuasokan",
        "https://linkedin.com/in/achu-a-4xd2y",
        "https://instagram.com/achu.asokan",
      ],
      description:
        "Full-stack software engineer based in Kerala, India, building modern web and mobile applications.",
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Express.js",
        "NestJS",
        "MongoDB",
        "PostgreSQL",
        "Docker",
        "Full Stack Web Development",
        "Mobile Applications",
        "UI/UX Design",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Engineering & Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Full Stack Web Application Development",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Mobile App Development",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "UI/UX & Frontend Engineering",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Achu Asokan",
      inLanguage: "en-IN",
      description:
        "Building fast, modern web and mobile apps. Turning ideas into production-ready products for clients.",
      image: `${SITE_URL}/achuasokan-opengraph.webp`,
      publisher: {
        "@id": `${SITE_URL}/#person`,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: "Achu Asokan — Full Stack Software Engineer",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
      primaryImageOfPage: `${SITE_URL}/achuasokan-opengraph.webp`,
      thumbnailUrl: `${SITE_URL}/achu.webp`,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
