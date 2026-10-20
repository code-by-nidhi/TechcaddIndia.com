/** "Artificial Intelligence (AI)" → "artificial-intelligence-ai". */
export function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip accents
    .toLowerCase()
    .replace(/&/g, ' ') // "SEO & AI" → "seo-ai"
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * `base` if it is free, otherwise `base-2`, `base-3`, … The result is added to
 * `taken`. Call it once when content is created and store the result: slugs
 * are never regenerated from a title that later changes.
 */
export function uniqueSlug(base: string, taken: Set<string>): string {
  let slug = base
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`
  taken.add(slug)
  return slug
}
