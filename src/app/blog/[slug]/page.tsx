import { notFound } from 'next/navigation';
import Link from 'next/link';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import PageTransition from '@/components/PageTransition';
import { getBlogPosts, getRaw } from '@/lib/content';
import Term from '@/components/blog/Term';
import Callout from '@/components/blog/Callout';
import CanvasDemo from '@/components/blog/CanvasDemo';
import FileTree from '@/components/blog/FileTree';
import SandpackDemo from '@/components/blog/SandpackDemo';
import PostDates from '@/components/blog/PostDates';

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

  const post = getBlogPosts().find(p => p.slug === slug);

  const { content, frontmatter } = await compileMDX<{
    title: string; description: string; date: string;
    updatedAt?: string; tags: string[];
  }>({
    source: raw,
    components: { Term, Callout, CanvasDemo, FileTree, SandpackDemo },
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
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <Link href="/blog"
            className="font-mono text-phi-xs text-muted hover:text-orange transition-colors mb-12 inline-block">
            ← back to blog
          </Link>

          <header style={{ marginBottom: '4rem' }}>
            {/* tags */}
            {frontmatter.tags?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {frontmatter.tags.map(t => (
                  <span key={t} className="font-mono text-phi-xs text-blue">{t}</span>
                ))}
              </div>
            )}

            <h1 className="font-sans text-phi-md md:text-phi-lg font-bold text-copy"
              style={{ marginBottom: '1rem' }}>
              {frontmatter.title}
            </h1>

            <p className="font-sans text-phi-base text-muted" style={{ marginBottom: '1.5rem' }}>
              {frontmatter.description}
            </p>

            <PostDates date={post?.date ?? frontmatter.date} updatedAt={post?.updatedAt} />
          </header>

          <div className="prose">{content}</div>
        </div>
      </article>
    </PageTransition>
  );
}
