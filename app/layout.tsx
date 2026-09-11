import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '../styles/app.css';

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
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
