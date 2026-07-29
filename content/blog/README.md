# Writing a new post

1. Copy `example-post/` to a new folder named after your slug, e.g. `content/blog/why-i-built-smartlms/`.
2. Put your cover image in that folder (any name — reference it from frontmatter) and your writing in `index.mdx`.
3. Fill in the frontmatter:

   ```yaml
   ---
   title: "Post title"
   excerpt: "One or two sentences — shown on the /blog index and used as the meta description. Optional; auto-generated from your first paragraph if omitted."
   coverImage: "./cover.jpg"
   coverImageAlt: "Describe the image for screen readers and SEO."
   tags: ["nextjs", "mongodb"]
   draft: false
   ---
   ```

4. Publish it:

   ```bash
   npm run blog:publish -- content/blog/why-i-built-smartlms
   ```

   Re-run the same command any time you edit the file — it updates the existing post instead of duplicating it (matched by slug, which defaults to the title, slugified). This writes the post text to MongoDB (live within seconds if `REVALIDATE_SECRET`/`SITE_URL` are set, otherwise on the next hourly ISR refresh) and copies the cover image to `public/blog/<slug>.<ext>`.

5. **Commit and push the new/updated file in `public/blog/`.** The post text updates live straight from Mongo, but the cover image is a static file — it only appears on the live site once it's been deployed. The script prints a reminder of this every time.

6. To take a post down without deleting it, set `draft: true` and re-publish, or run:

   ```bash
   npm run blog:unpublish -- <slug>
   ```

   (This only flips the Mongo flag — the image stays in `public/blog/` until you remove it yourself.)

This folder (`content/blog/`) is your git-tracked writing archive — the live site never reads these files directly, only what's been published into MongoDB (for text) and `public/blog/` (for cover images) via the commands above.
