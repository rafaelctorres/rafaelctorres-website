import Link from 'next/link';
import PageTransition from '@/components/PageTransition';
import { getProjects } from '@/lib/content';

export const metadata = { title: 'Portfolio' };

export default function PortfolioPage() {
  const projects = getProjects();
  return (
    <PageTransition>
      <div className="px-4 md:px-14 py-24">
        <div className="mx-auto max-w-content">
          <p className="font-mono text-phi-xs text-orange uppercase tracking-widest mb-4">work</p>
          <h1 className="font-sans text-phi-md md:text-phi-lg font-bold text-copy mb-16">Portfolio</h1>
          {projects.length===0
            ? <p className="font-mono text-phi-sm text-muted">No projects yet. Coming soon.</p>
            : <div className="grid md:grid-cols-2 gap-6">
                {projects.map(p=>(
                  <Link key={p.slug} href={`/portfolio/${p.slug}`}
                    className="border border-line p-8 hover:border-orange transition-colors group block">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h2 className="font-sans text-phi-md font-semibold text-copy group-hover:text-orange transition-colors">{p.title}</h2>
                      <span className="font-mono text-phi-xs text-muted shrink-0">{p.date.slice(0,7)}</span>
                    </div>
                    <p className="font-sans text-phi-sm text-muted mb-6 leading-relaxed">{p.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.stack.map(s=><span key={s} className="font-mono text-phi-xs text-muted border border-line px-2 py-1">{s}</span>)}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {p.tags.map(t=><span key={t} className="font-mono text-phi-xs text-blue">{t}</span>)}
                    </div>
                  </Link>
                ))}
              </div>
          }
        </div>
      </div>
    </PageTransition>
  );
}
