import type { BlogSubcategoryFromUnknownCategory, BlogCategory, PostBase } from '@/types/Blog';
import type { MaybeNull } from 'packages/shared-types/src/CustomUtilityTypes';
import type { LanguageFlag } from '@rtm/shared-types/I18n';

import { getAllBlogPostsByCategoryAndLanguage } from '@/lib/blog/api';
import { LANGUAGES } from '##/config/i18n';

namespace BlogCache {
  export const subcategoriesCollection = Object.fromEntries(LANGUAGES.map((language) => [language, {}])) as Record<
    LanguageFlag,
    Record<BlogCategory, BlogSubcategoryFromUnknownCategory[]>
  >;
}

async function buildSubcategoriesSet(category: BlogCategory, language: LanguageFlag): Promise<Set<BlogSubcategoryFromUnknownCategory>> {
  const relatedPosts: MaybeNull<PostBase[]> = await getAllBlogPostsByCategoryAndLanguage(category, language);
  const subcategoriesSet = new Set<BlogSubcategoryFromUnknownCategory>();

  if (relatedPosts === null) {
    const emptySet = new Set<BlogSubcategoryFromUnknownCategory>();
    return emptySet;
  }
  relatedPosts.forEach(({ subcategory }) => subcategoriesSet.add(subcategory as BlogSubcategoryFromUnknownCategory));
  return subcategoriesSet;
}

async function populateSubcategoriesCollectionCache(category: BlogCategory, language: LanguageFlag) {
  const subcategsSet: Set<BlogSubcategoryFromUnknownCategory> = await buildSubcategoriesSet(category, language);
  BlogCache.subcategoriesCollection[language][category] = Array.from(subcategsSet);
}

async function subcategoriesByCategoryGetter(category: BlogCategory, language: LanguageFlag) {
  if (BlogCache.subcategoriesCollection[language] === undefined) {
    BlogCache.subcategoriesCollection[language] = {} as Record<BlogCategory, BlogSubcategoryFromUnknownCategory[]>;
  }
  if (BlogCache.subcategoriesCollection[language][category] === undefined) await populateSubcategoriesCollectionCache(category, language);
  return BlogCache.subcategoriesCollection[language][category];
}

export async function getBlogSubcategoriesByCategory(category: BlogCategory, language: LanguageFlag): Promise<BlogSubcategoryFromUnknownCategory[]> {
  const subcategories: BlogSubcategoryFromUnknownCategory[] = await subcategoriesByCategoryGetter(category, language);
  return subcategories;
}
