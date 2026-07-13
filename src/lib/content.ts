import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ROOT = path.join(process.cwd(), 'content');

export type BlogPost = { slug:string; title:string; description:string; date:string; tags:string[]; draft:boolean; };
export type Project  = { slug:string; title:string; description:string; date:string; tags:string[]; stack:string[]; repo?:string; live?:string; featured:boolean; };

function ls(sub: string): string[] {
  const dir = path.join(ROOT, sub);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => /\.(md|mdx)$/.test(f));
}

export function getBlogPosts(): BlogPost[] {
  return ls('blog').map(file => {
    const slug = file.replace(/\.(md|mdx)$/, '');
    const { data } = matter(fs.readFileSync(path.join(ROOT, 'blog', file), 'utf8'));
    return { slug, title: data.title as string, description: data.description as string,
      date: new Date(data.date as string).toISOString(), tags: (data.tags as string[]) ?? [], draft: (data.draft as boolean) ?? false };
  }).filter(p => !p.draft).sort((a,b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
}

export function getProjects(): Project[] {
  return ls('portfolio').map(file => {
    const slug = file.replace(/\.(md|mdx)$/, '');
    const { data } = matter(fs.readFileSync(path.join(ROOT, 'portfolio', file), 'utf8'));
    return { slug, title: data.title as string, description: data.description as string,
      date: new Date(data.date as string).toISOString(), tags: (data.tags as string[]) ?? [],
      stack: (data.stack as string[]) ?? [], repo: data.repo as string|undefined,
      live: data.live as string|undefined, featured: (data.featured as boolean) ?? false };
  }).sort((a,b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
}

export function getRaw(type: 'blog'|'portfolio', slug: string): string|null {
  const dir = path.join(ROOT, type);
  if (!fs.existsSync(dir)) return null;
  const file = fs.readdirSync(dir).find(f => f.startsWith(slug + '.'));
  if (!file) return null;
  return fs.readFileSync(path.join(dir, file), 'utf8');
}
