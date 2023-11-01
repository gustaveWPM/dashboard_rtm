import { getBlogSubcategoriesByCategory } from '@/cache/blog';
import type { BlogArchitecture } from '@/config/blog';
import BlogConfig from '@/config/blog';
import { DEFAULT_LANGUAGE } from '@/config/i18n';
import ROUTES_ROOTS from '@/config/routes';
import InvalidArgumentsError from '@/errors/exceptions/InvalidArgument';
import type {
  BlogCategory,
  BlogCategoryAndSubcategoriesPair,
  BlogSubcategoryFromUnknownCategory,
  PostBase,
  UnknownBlogSlug,
  UnknownCategoryAndUnknownSubcategory
} from '@/types/Blog';
import type { AppPath } from '@/types/Next';
import type { LanguageFlag } from '@/types/i18n';
import type { IsoDateTimeString } from 'contentlayer/core';
import { redirect } from 'next/navigation';
import { getBlogPostLanguageFlagFromPostObj } from './i18n';
import { buildAbsolutePathFromParts, buildPathFromParts, getFormattedDate, getLastPathPart, indexOfNthOccurrence } from './str';

export const getBlogPostLanguageFlag = (post: PostBase): LanguageFlag => getBlogPostLanguageFlagFromPostObj(post);

const getBlogPostSubcategoryAndSlugStr = (post: PostBase): string => buildPathFromParts(getBlogPostSubcategory(post), getBlogPostSlug(post));

const getBlogPostSubcategoryAndSlugStrAndLangFlag = (post: PostBase): string =>
  buildPathFromParts(getBlogPostSubcategory(post), getBlogPostSlug(post), getBlogPostLanguageFlag(post));

/**
 * @throws {InvalidArgumentsError}
 */
function getBlogPostSubcategoryFromStr(sourceFileDir: string): BlogSubcategoryFromUnknownCategory {
  function subcategGetter(sourceFileDir: string, firstSlashIndex: number, secondSlashIndex: number): BlogSubcategoryFromUnknownCategory {
    if (secondSlashIndex !== -1) return sourceFileDir.substring(firstSlashIndex + 1, secondSlashIndex) as BlogSubcategoryFromUnknownCategory;
    return sourceFileDir.substring(firstSlashIndex + 1) as BlogSubcategoryFromUnknownCategory;
  }

  const firstSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 1);
  if (firstSlashIndex === -1) throw new InvalidArgumentsError(getBlogPostSubcategoryFromStr.name, { sourceFileDir });

  const secondSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 2);
  const subcateg = subcategGetter(sourceFileDir, firstSlashIndex, secondSlashIndex);
  return subcateg;
}

function getBlogPostSubcategoryFromPostObj(post: PostBase): BlogSubcategoryFromUnknownCategory {
  const { sourceFileDir } = post._raw;
  return getBlogPostSubcategoryFromStr(sourceFileDir);
}

/**
 * @throws {InvalidArgumentsError}
 */
export function getBlogCategoryFromPathname(pathname: AppPath): BlogCategory {
  const firstIndex = indexOfNthOccurrence(pathname, '/', 1);
  if (firstIndex === -1) throw new InvalidArgumentsError(getBlogCategoryFromPathname.name, { pathname });

  const secondIndex = indexOfNthOccurrence(pathname, '/', 2);
  if (secondIndex !== -1) return pathname.substring(firstIndex + 1, secondIndex) as BlogCategory;
  return pathname.substring(firstIndex + 1) as BlogCategory;
}

export const getBlogPostSubcategory = (post: PostBase): BlogSubcategoryFromUnknownCategory => getBlogPostSubcategoryFromPostObj(post);
export const getBlogPostSlug = (post: PostBase): UnknownBlogSlug => getLastPathPart(post._raw.flattenedPath);

/**
 * @throws {TypeError}
 * May throw a TypeError: "x[y] is not a function" at runtime, in a type unsafe context
 */
export const getAllBlogPostsByCategory = (categ: BlogCategory): PostBase[] => BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC[categ]();

export const getAllBlogPostsByCategoryAndSubcategoryUnstrict = ({ category, subcategory }: UnknownCategoryAndUnknownSubcategory): PostBase[] =>
  getAllBlogPostsByCategory(category).filter((post) => getBlogPostSubcategory(post) === subcategory);

export const getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict = (
  { category, subcategory }: UnknownCategoryAndUnknownSubcategory,
  language: LanguageFlag
): PostBase[] =>
  getAllBlogPostsByCategory(category).filter((post) => getBlogPostSubcategory(post) === subcategory && getBlogPostLanguageFlag(post) === language);

export function getBlogPostUnstrict(
  { category, subcategory }: UnknownCategoryAndUnknownSubcategory,
  targettedSlug: UnknownBlogSlug,
  langFlag: LanguageFlag
): undefined | PostBase {
  const postsCollection: PostBase[] = getAllBlogPostsByCategoryAndSubcategoryUnstrict({ category, subcategory });

  if (langFlag === DEFAULT_LANGUAGE) {
    return postsCollection.find((post) => getBlogPostSubcategoryAndSlugStr(post) === buildPathFromParts(subcategory, targettedSlug));
  }
  return postsCollection.find(
    (post) => getBlogPostSubcategoryAndSlugStrAndLangFlag(post) === buildPathFromParts(subcategory, targettedSlug, langFlag)
  );
}

export const getAllBlogPostsByCategoryAndSubcategoryStrict = <C extends BlogCategory>(category: C, subcategory: BlogArchitecture[C]): PostBase[] =>
  getAllBlogPostsByCategoryAndSubcategoryUnstrict({ category, subcategory });

export const getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagStrict = <C extends BlogCategory>(
  category: C,
  subcategory: BlogArchitecture[C],
  language: LanguageFlag
): PostBase[] => getAllBlogPostsByCategoryAndSubcategoryAndLanguageFlagUnstrict({ category, subcategory }, language);

export const getBlogPostStrict = <C extends BlogCategory>(
  category: C,
  subcategory: BlogArchitecture[C],
  targettedSlug: UnknownBlogSlug,
  langFlag: LanguageFlag
): undefined | PostBase => getBlogPostUnstrict({ category, subcategory }, targettedSlug, langFlag);

export const getAllBlogCategories = (): BlogCategory[] => Object.keys(BlogConfig.BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC) as BlogCategory[];

export function blogSubcategoryShouldTriggerNotFound<C extends BlogCategory>(
  postsCollection: PostBase[],
  { category, subcategory }: BlogCategoryAndSubcategoriesPair<C>
): boolean {
  const isForcedPath = BlogConfig.FORCED_BLOG_SUBCATEGORIES_PATHS[category]?.includes(subcategory);
  return postsCollection.length === 0 && !isForcedPath;
}

export function getBlogPostFormattedDate(lng: LanguageFlag, { date }: PostBase): string {
  const postDateHasTime = (date: IsoDateTimeString) => date.substring(date.indexOf('T') + 1) !== '00:00:00.000Z';

  const giveTime = postDateHasTime(date);
  const formattedDate = getFormattedDate(lng, new Date(date), giveTime);
  return formattedDate;
}

export function isValidBlogCategory(category: string): boolean {
  const categories = getAllBlogCategories();
  if (!categories.includes(category as any)) return false;
  return true;
}

export function isValidBlogCategoryAndSubcategoryPair(category: BlogCategory, subcategory: BlogSubcategoryFromUnknownCategory): boolean {
  if (!isValidBlogCategory(category)) return false;

  const subcategories = getBlogSubcategoriesByCategory(category);
  if (!subcategories.includes(subcategory)) return false;
  return true;
}

export const redirectToBlogCategoryPage = (category: BlogCategory): void => redirect(buildAbsolutePathFromParts(ROUTES_ROOTS.BLOG, category));

export const redirectToBlogCategoryAndSubcategoryPairPageUnstrict = (category: BlogCategory, subcategory: BlogSubcategoryFromUnknownCategory): void =>
  redirect(buildAbsolutePathFromParts(ROUTES_ROOTS.BLOG, category, subcategory));

export function getBlogPostPathWithoutI18nPart(post: PostBase): AppPath {
  const langFlag = getBlogPostLanguageFlagFromPostObj(post);
  if (langFlag === DEFAULT_LANGUAGE) return post.url;
  const blogPostPathWithoutI18nPart = post.url.replace(`/${langFlag}/`, '/');
  return blogPostPathWithoutI18nPart;
}
