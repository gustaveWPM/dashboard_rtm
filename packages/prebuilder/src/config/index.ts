/* v8 ignore start */
// Stryker disable all
import type { FormatCodeSettings } from 'ts-morph';

/* ⚙️ Tweakers - SAFE */
export const MAX_BLOG_TAXONOMY_LEN: number = 34;
export const MAX_LP_TAXONOMY_LEN: number = 128;

const MY_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS: string[] = [];
const MY_I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS: string[] = [];

/* ⛔ Do NOT edit the code BELOW this line unless you (really) know what you are doing */
export const FLAGS = {
  I18N_LOCALES_SCHEMA_FILEPATH: '--i18n-locales-schema',
  SKIP_LOCALES_INFOS: '--skip-locales-infos',
  BLOG_POSTS_FOLDER: '--blog-posts-folder',
  SKIP_BENCHMARKS: '--skip-benchmarks',
  LANDING_PAGES_FOLDER: '--lp-folder',
  NO_BLOG: '--no-blog',
  NO_I18N: '--no-i18n',
  NO_LP: '--no-lp',
  LANG: '--lang'
} as const satisfies Record<PropertyKey, string>;

export const I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS: string[] = [...MY_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS, 'title', 'meta-description'];
export const I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS: string[] = [...MY_I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS, 'title', 'meta-description'];

export const LIST_ELEMENT_PREFIX: string = '\n - ';
export const TS_MORPH_FORMATTER_SETTINGS = { ensureNewLineAtEndOfFile: true, indentSize: 2 } as const satisfies FormatCodeSettings;

export const BLOG_POST_FILE_EXT: string = '.mdx';
export const LP_FILE_EXT: string = '.mdx';
export const I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_PREFIX: string = '_';
export const BLOG_TYPE_STR: string = 'Blog';
export const LP_TYPE_STR: string = 'LandingPages';
export const BLOG_ARCHITECTURE_TYPE_STR: string = 'BlogArchitecture';
export const BLOG_CATEGORIES_CONST_STR: string = 'blogCategories';
export const GENERATIONS_TARGET_FOLDER: string = '.rtm-generated';

export const LOCALES_INFOS_ROOT_KEY: string = '_infos';
export const LOCALES_LNG_INFOS_KEY: string = 'lng';
export const LOCALES_INFOS_OBJ_NEEDLE: string = `${LOCALES_INFOS_ROOT_KEY}:`;
export const ROOT_FOLDER_RELATIVE_PATH_FROM_PREBUILDER_CTX: string = '../../../';
export const DEFAULT_LANGUAGE_KEY: string = 'DEFAULT_LANGUAGE';
export const AUTOGENERATED_CODE_COMMENT_STR: string = "// AUTOGENERATED: Don't edit this file!\n";

export const DOC_URL: string = 'https://github.com/Tirraa/dashboard_rtm/tree/main/doc';
export const BUGTRACKER_URL: string = 'https://github.com/Tirraa/dashboard_rtm/issues';
// Stryker restore all
/* v8 ignore stop */
