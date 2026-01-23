# Add Blog Post

Help create a new blog post with proper structure and frontmatter.

## Steps

1. Ask the user for:
   - Blog post title
   - Brief description/topic
   - Tags (suggest from existing tags in the blog)
2. Generate a URL-friendly slug from the title
3. Create the MDX file at `app/routes/blog.<slug>.mdx` with:
   - Proper frontmatter (title, date as today's date, image placeholder, tags)
   - Initial content structure with headings
4. Verify the file follows the existing blog post patterns by reading a few existing posts
5. Run typecheck to ensure no issues

## Frontmatter Template
```yaml
---
title: "<title>"
date: "<YYYY-MM-DD>"
image: "/images/<slug>.webp"
tags: ["tag1", "tag2"]
---
```
