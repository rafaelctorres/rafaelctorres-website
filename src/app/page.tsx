import Link from 'next/link';
import HeroCanvas from '@/components/HeroCanvas';
import PageTransition from '@/components/PageTransition';
import { getBlogPosts, getProjects } from '@/lib/content';

export default function HomePage() {
  const posts    = getBlogPosts().slice(0, 3);
  const projects = getProjects().filter(p => p.featured).slice(0, 3);

  return (
    <PageTransition>

      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center">
        <HeroCanvas />
        <div className="relative z-10 flex flex-col items-center text-center px-4 py-24">
          <p className="font-mono text-phi-xs text-orange uppercase tracking-widest"
            style={{ marginBottom: '2rem' }}>
            Fortaleza, Brasil
          </p>
          {/* single line, no <br /> */}
          <h1 className="font-sans font-bold text-copy"
            style={{ fontSize: 'clamp(42px, 8vw, 68px)', lineHeight: 1.05, marginBottom: '3rem', whiteSpace: 'nowrap' }}>
            Rafael C. Torres
          </h1>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/portfolio"
              className="font-mono text-phi-xs uppercase tracking-widest border border-orange text-orange px-6 py-3 hover:bg-orange hover:text-surface transition-colors">
              view work
            </Link>
            <Link href="/blog"
              className="font-mono text-phi-xs uppercase tracking-widest border border-line text-muted px-6 py-3 hover:border-copy hover:text-copy transition-colors">
              read blog
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #0D0D0F)' }} />
      </section>

      {/* ── Focus ─────────────────────────────────── */}
      <section className="px-4 md:px-14 pt-12 pb-24">
        {/* explicit maxWidth + margin auto to guarantee centering */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <p className="font-mono text-phi-xs text-muted uppercase tracking-widest"
            style={{ marginBottom: '2.5rem' }}>
            focus
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { n: '01', label: 'Applied Mathematics for Multimedia',
                desc: 'Signal processing, spectral analysis, geometric algebra, and the mathematical foundations of visual and audio media.' },
              { n: '02', label: 'Deep Learning',
                desc: 'Computer vision, facial action unit detection, model evaluation pipelines, and applied machine learning research.' },
              { n: '03', label: 'Web Development',
                desc: 'WebGL, real-time rendering, interactive systems, and creative tooling — interfaces that demonstrate ideas directly.' },
            ].map(({ n, label, desc }) => (
              <div key={n} className="border border-line hover:border-orange transition-colors group"
                style={{ padding: '2rem', textAlign: 'center' }}>
                <span className="font-mono text-phi-xs text-orange" style={{ display: 'block', marginBottom: '1rem' }}>{n}</span>
                <h2 className="font-sans text-phi-base font-semibold text-copy group-hover:text-orange transition-colors"
                  style={{ marginBottom: '0.75rem' }}>{label}</h2>
                <p className="font-sans text-phi-sm text-muted" style={{ lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent posts ──────────────────────────── */}
      {posts.length > 0 && (
        <section className="px-4 md:px-14 py-16 border-t border-line">
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p className="font-mono text-phi-xs text-muted uppercase tracking-widest" style={{ marginBottom: '2rem' }}>
              recent posts
            </p>
            <ul className="m-0 p-0 list-none">
              {posts.map(post => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`}
                    className="flex items-center gap-6 py-5 border-b border-line hover:border-orange group transition-colors">
                    <span className="font-mono text-phi-xs text-muted" style={{ width: '6rem', flexShrink: 0 }}>
                      {post.date.slice(0, 10)}
                    </span>
                    <span className="font-sans text-phi-base text-copy group-hover:text-orange transition-colors flex-1">
                      {post.title}
                    </span>
                    <span className="font-mono text-phi-xs text-orange" style={{ opacity: 0, transition: 'opacity 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '0')}>→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/blog" className="font-mono text-phi-xs text-muted hover:text-orange transition-colors"
              style={{ marginTop: '2rem', display: 'inline-block' }}>
              all posts →
            </Link>
          </div>
        </section>
      )}

      {/* ── Featured projects ─────────────────────── */}
      {projects.length > 0 && (
        <section className="px-4 md:px-14 py-16 border-t border-line">
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p className="font-mono text-phi-xs text-muted uppercase tracking-widest" style={{ marginBottom: '2rem' }}>
              featured work
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {projects.map(p => (
                <Link key={p.slug} href={`/portfolio/${p.slug}`}
                  className="border border-line hover:border-orange transition-colors group"
                  style={{ display: 'block', padding: '1.5rem' }}>
                  <h3 className="font-sans text-phi-base font-semibold text-copy group-hover:text-orange transition-colors"
                    style={{ marginBottom: '0.5rem' }}>{p.title}</h3>
                  <p className="font-sans text-phi-sm text-muted" style={{ marginBottom: '1rem', lineHeight: 1.6 }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {p.tags.map(t => <span key={t} className="font-mono text-phi-xs text-blue">{t}</span>)}
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/portfolio" className="font-mono text-phi-xs text-muted hover:text-orange transition-colors"
              style={{ marginTop: '2rem', display: 'inline-block' }}>
              all projects →
            </Link>
          </div>
        </section>
      )}

    </PageTransition>
  );
}
