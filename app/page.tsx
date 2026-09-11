import { YorkshireRose } from '../components/YorkshireRose';

export default function Home() {
  const date = new Date().getFullYear();

  return (
    <div className="h-screen flex flex-col text-white relative">
      <div className="clouds" aria-hidden="true" />

      <header className="content flex-shrink-0 w-full max-w-screen-xl mx-auto">
        <nav className="grid grid-cols-1 md:grid-cols-4 p-10 text-base lg:text-xl">
          <a href="tel:+447460843016" className="md:col-start-3 md:text-right">+44 (0) 7460 843016</a>
          <a href="mailto:team@colouringcode.com" className="md:text-right">team@colouringcode.com</a>
        </nav>
      </header>

      <main className="content flex-grow flex-shrink-0 w-full max-w-screen-xl flex flex-row justify-center content-center flex-wrap mx-auto">
        <section className="w-full px-10 max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-bold">Want more?</h1>
          <p className="text-xl mb-10 max-w-prose">Award-winning pixel-crafting for the digital world.</p>
        </section>
      </main>

      <footer className="content flex-shrink-0 w-full max-w-screen-xl mx-auto">
        <section className="p-10 text-sm">
          <p>&copy; 2010 - { date } {'//'} Forged in Yorkshire <YorkshireRose /> using <a href="https://nextjs.org/">Next.js</a>, <a href="https://vercel.com">Vercel</a> &amp; <a href="https://claude.com/claude-code">Claude</a>.</p>
        </section>
      </footer>
    </div>
  );
}
