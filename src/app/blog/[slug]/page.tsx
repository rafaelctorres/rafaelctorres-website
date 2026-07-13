import { notFound } from 'next/navigation';
import Link from 'next/link';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import PageTransition from '@/components/PageTransition';
import { getBlogPosts, getRaw } from '@/lib/content';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getBlogPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getBlogPosts().find(p => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const raw = getRaw('blog', slug);
  if (!raw) notFound();

  const { content, frontmatter } = await compileMDX<{
    title: string; description: string; date: string; tags: string[];
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
          <Link href="/blog" className="font-mono text-phi-xs text-muted hover:text-orange transition-colors mb-12 inline-block">
            ← back to blog
          </Link>
          <header className="mb-16">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="font-mono text-phi-xs text-muted">{frontmatter.date?.slice(0,10)}</span>
              {frontmatter.tags?.map(t=><span key={t} className="font-mono text-phi-xs text-blue">{t}</span>)}
            </div>
            <h1 className="font-sans text-phi-md md:text-phi-lg font-bold text-copy mb-4">{frontmatter.title}</h1>
            <p className="font-sans text-phi-base text-muted">{frontmatter.description}</p>
          </header>
          <div className="prose">{content}</div>
        </div>
      </article>
    </PageTransition>
  );
}
