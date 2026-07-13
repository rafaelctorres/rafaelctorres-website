'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/',          label: 'home' },
  { href: '/blog',      label: 'blog' },
  { href: '/portfolio', label: 'portfolio' },
  { href: '/about',     label: 'about' },
];

export default function Nav() {
  const pathname = usePathname();
  const active = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className="border-b border-line px-4 md:px-14 sticky top-0 z-50 backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(13,13,15,0.88)' }}
    >
      <nav className="h-16 flex items-center justify-between" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <Link href="/" className="font-mono text-phi-base font-medium text-copy hover:text-orange transition-colors">
          rct<span className="text-orange">.</span>
        </Link>
        {/* links right-aligned via ml-auto */}
        <ul className="flex items-center gap-4 md:gap-8 list-none m-0 p-0 ml-auto">
          {links.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-mono text-phi-xs uppercase tracking-widest transition-colors ${
                  active(link.href) ? 'text-orange' : 'text-muted hover:text-copy'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
