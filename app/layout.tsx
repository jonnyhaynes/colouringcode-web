import type { Metadata, Viewport } from 'next';
import { Big_Shoulders } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

// Self-hosted at build time by next/font — no runtime request to Google.
// Google folded the old "Big Shoulders Display" family into "Big Shoulders";
// same typeface the old site's Google Fonts <link> resolved to.
const bigShoulders = Big_Shoulders({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-big-shoulders',
});

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: 'Colouring Code',
  applicationName: 'Colouring Code',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#000000' }],
  },
  appleWebApp: {
    title: 'Colouring Code',
  },
  other: {
    'msapplication-TileColor': '#000000',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={bigShoulders.variable}>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-SMKSXYK49K" />
        <Script id="gtag-init">
          {` window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-SMKSXYK49K');`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
