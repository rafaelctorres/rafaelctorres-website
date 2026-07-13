import { notFound } from 'next/navigation';
import Link from 'next/link';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import PageTransition from '@/components/PageTransition';
import { getProjects, getRaw } from '@/lib/content';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getProjects().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProjects().find(p => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const raw = getRaw('portfolio', slug);
  if (!raw) notFound();

  const { content, frontmatter } = await compileMDX<{
    title:string; description:string; date:string; stack:string[]; repo?:string; live?:string;
  }>({
    source: raw,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkMath],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rehypePlugins: [rehypeKatex as any, [rehypePrettyCode, { theme: 'github-dark-default' }] as any],
      },
    },
  });

  return (
    <PageTransition>
      <article className="px-4 md:px-14 py-24">
        <div className="mx-auto max-w-content">
          <Link href="/portfolio" className="font-mono text-phi-xs text-muted hover:text-orange transition-colors mb-12 inline-block">
            ← back to portfolio
          </Link>
          <header className="mb-16">
            <p className="font-mono text-phi-xs text-muted mb-4">{frontmatter.date?.slice(0,7)}</p>
            <h1 className="font-sans text-phi-md md:text-phi-lg font-bold text-copy mb-4">{frontmatter.title}</h1>
            <p className="font-sans text-phi-base text-muted mb-8">{frontmatter.description}</p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {frontmatter.stack?.map(s=><span key={s} className="font-mono text-phi-xs text-muted border border-line px-2 py-1">{s}</span>)}
              </div>
              <div className="flex gap-6 ml-auto">
                {frontmatter.repo&&<Link href={frontmatter.repo} target="_blank" rel="noopener noreferrer" className="font-mono text-phi-xs text-orange hover:text-orange-dim transition-colors">repo →</Link>}
                {frontmatter.live&&<Link href={frontmatter.live} target="_blank" rel="noopener noreferrer" className="font-mono text-phi-xs text-blue hover:text-blue-dim transition-colors">live →</Link>}
              </div>
            </div>
          </header>
          <div className="prose">{content}</div>
        </div>
      </article>
    </PageTransition>
  );
}
