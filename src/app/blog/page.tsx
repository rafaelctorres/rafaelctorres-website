import Link from 'next/link';
import PageTransition from '@/components/PageTransition';
import { getBlogPosts } from '@/lib/content';

export const metadata = { title: 'Blog' };

export default function BlogPage() {
  const posts = getBlogPosts();
  return (
    <PageTransition>
      <div className="px-4 md:px-14 py-24">
        <div className="mx-auto max-w-content">
          <p className="font-mono text-phi-xs text-orange uppercase tracking-widest mb-4">writing</p>
          <h1 className="font-sans text-phi-md md:text-phi-lg font-bold text-copy mb-16">Blog</h1>
          {posts.length===0
            ? <p className="font-mono text-phi-sm text-muted">No posts yet. Check back soon.</p>
            : <ul className="m-0 p-0 list-none">
                {posts.map(post=>(
                  <li key={post.slug} className="border-b border-line">
                    <Link href={`/blog/${post.slug}`} className="flex items-start gap-6 md:gap-10 py-8 group">
                      <span className="font-mono text-phi-xs text-muted shrink-0 pt-1 w-24">{post.date.slice(0,10)}</span>
                      <div className="flex-1">
                        <h2 className="font-sans text-phi-md font-semibold text-copy mb-2 group-hover:text-orange transition-colors">{post.title}</h2>
                        <p className="font-sans text-phi-sm text-muted mb-3 leading-relaxed">{post.description}</p>
                        {post.tags.length>0&&<div className="flex flex-wrap gap-3">{post.tags.map(t=><span key={t} className="font-mono text-phi-xs text-blue">{t}</span>)}</div>}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
          }
        </div>
      </div>
    </PageTransition>
  );
}
