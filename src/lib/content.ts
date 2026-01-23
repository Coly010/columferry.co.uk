import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const LORE_DIR = path.join(process.cwd(), "content/lore");
const BOOKS_DIR = path.join(process.cwd(), "content/books");
const UPDATES_DIR = path.join(process.cwd(), "content/updates");

export interface BlogPost {
  slug: string;
  title: string;
  description?: string;
  publishedDate?: string;
  image?: string;
  tags?: string[];
  canonical?: string;
  content: string;
}

export interface Book {
  slug: string;
  title: string;
  publishedDate?: string;
  amazonLink?: string;
  image?: string;
  wip: boolean;
  content: string;
}

export interface Update {
  slug: string;
  title: string;
  postedDate: string;
  tags: string[];
  content: string;
}

export interface LoreArticle {
  slug: string;
  title: string;
  description?: string;
  postedDate?: string;
  image?: string;
  loreType?: "location" | "character" | "natural-wonder";
  tags?: string[];
  content: string;
}

function readMdxFile(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { data, content };
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const slugs = fs
    .readdirSync(BLOG_DIR)
    .filter((entry) =>
      fs.statSync(path.join(BLOG_DIR, entry)).isDirectory(),
    );

  return slugs
    .map((slug) => {
      const filePath = path.join(BLOG_DIR, slug, "index.mdx");
      if (!fs.existsSync(filePath)) return null;
      const { data, content } = readMdxFile(filePath);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description,
        publishedDate: data.publishedDate,
        image: data.image,
        tags: data.tags,
        canonical: data.canonical,
        content,
      };
    })
    .filter(Boolean) as BlogPost[];
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, slug, "index.mdx");
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = readMdxFile(filePath);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description,
    publishedDate: data.publishedDate,
    image: data.image,
    tags: data.tags,
    canonical: data.canonical,
    content,
  };
}

export function getAllLoreArticles(): LoreArticle[] {
  if (!fs.existsSync(LORE_DIR)) return [];
  const slugs = fs
    .readdirSync(LORE_DIR)
    .filter((entry) =>
      fs.statSync(path.join(LORE_DIR, entry)).isDirectory(),
    );

  return slugs
    .map((slug) => {
      const filePath = path.join(LORE_DIR, slug, "index.mdx");
      if (!fs.existsSync(filePath)) return null;
      const { data, content } = readMdxFile(filePath);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description,
        postedDate: data.postedDate,
        image: data.image,
        loreType: data.loreType,
        tags: data.tags,
        content,
      };
    })
    .filter(Boolean) as LoreArticle[];
}

export function getLoreArticle(slug: string): LoreArticle | null {
  const filePath = path.join(LORE_DIR, slug, "index.mdx");
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = readMdxFile(filePath);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description,
    postedDate: data.postedDate,
    image: data.image,
    loreType: data.loreType,
    tags: data.tags,
    content,
  };
}

export function getAllBooks(): Book[] {
  if (!fs.existsSync(BOOKS_DIR)) return [];
  const slugs = fs
    .readdirSync(BOOKS_DIR)
    .filter((entry) =>
      fs.statSync(path.join(BOOKS_DIR, entry)).isDirectory(),
    );

  return slugs
    .map((slug) => {
      const filePath = path.join(BOOKS_DIR, slug, "index.mdx");
      if (!fs.existsSync(filePath)) return null;
      const { data, content } = readMdxFile(filePath);
      return {
        slug,
        title: data.title ?? slug,
        publishedDate: data.publishedDate,
        amazonLink: data.amazonLink,
        image: data.image,
        wip: data.wip ?? false,
        content,
      };
    })
    .filter(Boolean) as Book[];
}

export function getAllUpdates(): Update[] {
  if (!fs.existsSync(UPDATES_DIR)) return [];
  const slugs = fs
    .readdirSync(UPDATES_DIR)
    .filter((entry) =>
      fs.statSync(path.join(UPDATES_DIR, entry)).isDirectory(),
    );

  return slugs
    .map((slug) => {
      const filePath = path.join(UPDATES_DIR, slug, "index.mdx");
      if (!fs.existsSync(filePath)) return null;
      const { data, content } = readMdxFile(filePath);
      return {
        slug,
        title: data.title ?? slug,
        postedDate: data.postedDate,
        tags: data.tags ?? [],
        content,
      };
    })
    .filter(Boolean) as Update[];
}
