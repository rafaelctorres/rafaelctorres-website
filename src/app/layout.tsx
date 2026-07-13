import type { Metadata } from 'next';
import '@/styles/global.css';
import 'katex/dist/katex.min.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: { template: '%s — Rafael Torres', default: 'Rafael Torres' },
  description: 'Applied mathematics for multimedia, deep learning, and web development.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
