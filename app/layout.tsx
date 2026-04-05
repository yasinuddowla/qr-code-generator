import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "QR Code Generator - Customize & Create QR Codes | Yasin Uddowla",
  description: "Create beautiful, customizable QR codes with custom colors, logos, and margin sizes. Free QR code generator by Yasin Uddowla. Generate QR codes for URLs, text, and more.",
  keywords: ["QR code generator", "custom QR codes", "QR code creator", "QR code with logo", "free QR code generator", "customizable QR codes"],
  authors: [{ name: "Yasin Uddowla", url: "https://yasinuddowla.com" }],
  creator: "Yasin Uddowla",
  publisher: "Yasin Uddowla",
  openGraph: {
    title: "QR Code Generator - Customize & Create QR Codes",
    description: "Create beautiful, customizable QR codes with custom colors, logos, and margin sizes. Free QR code generator.",
    url: "https://qr.dow.la",
    siteName: "QR Code Generator by Yasin Uddowla",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QR Code Generator - Customize & Create QR Codes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator - Customize & Create QR Codes",
    description: "Create beautiful, customizable QR codes with custom colors, logos, and margin sizes. Free QR code generator.",
    creator: "@yasinuddowla",
    images: ["/twitter-image.png"],
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
  verification: {
    // Add your verification codes if needed
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://qr.dow.la",
  },
  metadataBase: new URL("https://qr.dow.la"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakartaSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
