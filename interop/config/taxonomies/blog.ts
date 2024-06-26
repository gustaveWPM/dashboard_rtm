/* v8 ignore start */
// Stryker disable all

import type { BlogSubcategoryFromUnknownCategory, UnknownBlogSlug, BlogCategory } from '@/types/Blog';
import type LanguageFlag from '@rtm/shared-types/LanguageFlag';

import type I18nTaxonomy from './i18n';

namespace BlogTaxonomy {
  export const CATEGORY = 'categ';
  export const SUBCATEGORY = 'subcateg';
  export const SLUG = 'slug';
}

export type BlogTaxonomyType = {
  [BlogTaxonomy.SUBCATEGORY]: BlogSubcategoryFromUnknownCategory;
  [I18nTaxonomy.LANGUAGE]: LanguageFlag;
  [BlogTaxonomy.CATEGORY]: BlogCategory;
  [BlogTaxonomy.SLUG]: UnknownBlogSlug;
};

export default BlogTaxonomy;

// Stryker restore all
/* v8 ignore stop */
