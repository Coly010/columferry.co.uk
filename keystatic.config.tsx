import { config, fields, collection } from "@keystatic/core";

const isGithubMode = !!(
  process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
  process.env.KEYSTATIC_SECRET
);

const storage = isGithubMode
  ? {
      kind: "github" as const,
      repo: {
        owner: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER ?? "Coly010",
        name:
          process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO ?? "columferry.co.uk",
      },
    }
  : { kind: "local" as const };

export default config({
  storage,
  collections: {
    books: collection({
      label: "Books",
      slugField: "title",
      path: "content/books/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        publishedDate: fields.date({
          label: "Published Date",
        }),
        amazonLink: fields.url({
          label: "Amazon Link",
        }),
        image: fields.text({
          label: "Cover Image Path",
          description: "Path relative to public/ (e.g. /books/my-book.jpg)",
        }),
        wip: fields.checkbox({
          label: "Work in Progress",
          defaultValue: false,
        }),
        content: fields.mdx({
          label: "Blurb",
        }),
      },
    }),
    updates: collection({
      label: "Updates",
      slugField: "title",
      path: "content/updates/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        postedDate: fields.date({
          label: "Posted Date",
          validation: { isRequired: true },
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        content: fields.mdx({
          label: "Content",
        }),
      },
    }),
    blog: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "content/blog/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        publishedDate: fields.date({
          label: "Published Date",
          validation: { isRequired: true },
        }),
        image: fields.text({
          label: "Image Path",
          description: "Path relative to public/ (e.g. /posts/my-image.avif)",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        canonical: fields.url({
          label: "Canonical URL",
          description: "Original URL if cross-posted",
        }),
        content: fields.mdx({
          label: "Content",
        }),
      },
    }),
    lore: collection({
      label: "Lore Articles",
      slugField: "title",
      path: "content/lore/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        postedDate: fields.date({
          label: "Posted Date",
          validation: { isRequired: true },
        }),
        image: fields.text({
          label: "Image Path",
          description:
            "Path relative to public/ (e.g. /books/tutarium/lore/image.png)",
        }),
        loreType: fields.select({
          label: "Lore Type",
          options: [
            { label: "Location", value: "location" },
            { label: "Character", value: "character" },
            { label: "Natural Wonder", value: "natural-wonder" },
          ],
          defaultValue: "location",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        content: fields.mdx({
          label: "Content",
        }),
      },
    }),
  },
});
