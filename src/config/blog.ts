import type { DatesCompareFun } from '##/types/hell/dateManipulations';
import type { StringsCompareFun } from '##/types/hell/stringManipulations';
import { compareAlphabetically } from '@/lib/str';
import type { BlogCategory, ForcedBlogSubcategoriesPaths, PostsCollectionAssoc } from '@/types/Blog';
import compareDesc from 'date-fns/compareDesc';

type TBlogConfig = {
  DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT: number;
  DISPLAYED_BLOG_POSTS_PER_SUBCATEGORY_ON_BLOG_CATEGORY_PAGE_LIMIT: number;
  BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT: number;
  BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC: PostsCollectionAssoc<BlogCategory>;
  FORCED_BLOG_SUBCATEGORIES_PATHS: ForcedBlogSubcategoriesPaths;
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_SUBCATEGORIES_ON_BLOG_CATEGORY_PAGE: StringsCompareFun;
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_CATEGORY_PAGE: DatesCompareFun;
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE: DatesCompareFun;
};

export type BlogArchitecture = {
  'patch-notes': 'dashboard' | 'discord-bot';
  'patch-notes-bis': 'dashboard-bis' | 'discord-bot-bis';
};

export const BlogConfig: TBlogConfig = {
  DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT: 5,
  DISPLAYED_BLOG_POSTS_PER_SUBCATEGORY_ON_BLOG_CATEGORY_PAGE_LIMIT: 2,
  BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT: 250,

  BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC: {
    'patch-notes': () => import('contentlayer/generated').then((module) => module.allPatchPosts),
    'patch-notes-bis': () => import('contentlayer/generated').then((module) => module.allPatchPostBis)
  },

  FORCED_BLOG_SUBCATEGORIES_PATHS: {
    'patch-notes': ['dashboard', 'discord-bot'],
    'patch-notes-bis': ['dashboard-bis', 'discord-bot-bis']
  },

  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_SUBCATEGORIES_ON_BLOG_CATEGORY_PAGE: compareAlphabetically,
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_CATEGORY_PAGE: compareDesc,
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE: compareDesc
};

export default BlogConfig;
