/* eslint-disable @next/next/inline-script-id */
/* eslint-disable @next/next/no-script-component-in-head */
import type { NextPage } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import { YorkshireRose } from '../components/YorkshireRose';

const Home: NextPage = () => {
  const date = new Date().getFullYear();

  return (
    <div className="h-screen flex flex-col text-white relative">
      <div className="clouds" aria-hidden="true" />

      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Colouring Code</title>

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="apple-mobile-web-app-title" content="Colouring Code" />
        <meta name="application-name" content="Colouring Code" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;700&display=swap" rel="stylesheet" />

        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-SMKSXYK49K"></Script>
        <Script>
           {` window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-SMKSXYK49K');`}
        </Script>
      </Head>

      <header className="content flex-shrink-0 w-full max-w-screen-xl mx-auto">
            <nav className="grid grid-cols-1 md:grid-cols-4 p-10 text-base lg:text-xl">
                <a href="tel:+447460843016" className="md:col-start-3 md:text-right">+44 (0) 7460 843016</a>
                <a href="mailto:team@colouringcode.com" className="md:text-right">team@colouringcode.com</a>
            </nav>
        </header>

        <main className="content flex-grow flex-shrink-0 w-full max-w-screen-xl flex flex-row justify-center content-center flex-wrap mx-auto">
            <section className="w-full px-10">
                <h1 className="text-6xl md:text-8xl font-bold">Want more?</h1>
                <p className="text-xl mb-10">Award-winning pixel-crafting for the digital world.</p>
            </section>
        </main>

        <footer className="content flex-shrink-0 w-full max-w-screen-xl mx-auto">
            <section className="p-10 text-sm">
              <p>&copy; 2010 - { date } {'//'} Forged in Yorkshire <YorkshireRose /> using <a href="https://nextjs.org/">Next.js</a>, <a href="https://vercel.com">Vercel</a> &amp; <a href="https://claude.com/claude-code">Claude</a>.</p>
            </section>
        </footer>
    </div>
  )
}

export default Home
