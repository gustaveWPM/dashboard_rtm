/* v8 ignore start */
// Stryker disable all

import type { TypedLeafsVocabData } from '@rtm/shared-types/I18n';

import { blogAuthorOptionsVocabSchema } from '##/linkers/contentlayer/blog/authors';
import { blogTagOptionsVocabSchema } from '##/linkers/contentlayer/blog/tags';
import { blogCategories } from '@rtm/generated';

import PAGES_TITLES from './fragments/schema/pagesTitles';

const _: NotScanned = '';

export const SHARED_VOCAB_SCHEMA = {
  vocab: {
    'start-typing': _,
    notifications: _,
    breadcrumbs: _,
    'sign-up': _,
    brand: _,
    draft: _,
    pages: _,
    logo: _,
    page: _,
    tags: _,
    blog: _,
    all: _,
    toc: _
  },

  'pages-titles': PAGES_TITLES
} as const satisfies TypedLeafsVocabData<NotScanned>;

export default {
  'search-menu': {
    'sr-only': {
      'choose-search-mode': _,
      'close-search-menu': _,
      'dashboard-access': _,
      'homepage-access': _,
      'quick-access': _,
      'blog-access': _,
      'next-screen': _,
      'prev-screen': _,
      results: _
    },

    options: {
      pages: _,
      blog: _,
      all: _
    },

    'nothing-found': _
  },

  vocab: {
    ...SHARED_VOCAB_SCHEMA.vocab,
    'sr-only': {
      'brand-logo': _,
      'sort-by': _,
      goToTop: _
    },

    'copy-to-clipboard': _,
    'invite-the-bot': _,
    'no-blog-post': _,
    'footer-copy': _,
    'brand-short': _,
    'more-pages': _,
    'see-more': _,
    pagination: _,
    loading: _,
    '404': _,
    prev: _,
    next: _
  },

  navbar: {
    'sr-only': {
      'close-language-switcher-menu': _,
      'open-language-switcher-menu': _,
      'language-switcher-menu': _,
      'close-hamburger-menu': _,
      'switch-to-light-mode': _,
      'open-hamburger-menu': _,
      'switch-to-dark-mode': _,
      'open-search-menu': _,
      'hamburger-menu': _
    },

    assistance: _
  },

  blog: {
    toc: {
      'sr-only': {
        'hide-toc': _,
        'show-toc': _
      }
    },

    'tags-filters': {
      'no-result-found': _,
      'clear-filters': _
    },

    authors: blogAuthorOptionsVocabSchema,
    tags: blogTagOptionsVocabSchema,
    categories: blogCategories
  },

  dashboard: {
    'sr-only': {
      'hide-sidebar': _,
      'show-sidebar': _
    },

    'pages-titles': {
      main: _,
      foo: _,
      bar: _
    }
  },

  filters: {
    'select-a-filter': _,
    'alphabet-desc': _,
    'alphabet-asc': _,
    'date-desc': _,
    'date-asc': _
  },

  errors: {
    brokenPagefindIntegration: {
      message: _,
      title: _
    }
  },

  auth: {
    logout: _,
    signup: _,
    login: _
  },

  'pages-titles': SHARED_VOCAB_SCHEMA['pages-titles'],

  metadescriptions: {
    homepage: _
  },

  _infos: {
    lng: '__SCANNED__'
  }
} as const satisfies TypedLeafsVocabData<MaybeScanned>;

type NotScanned = '';
type Scanned = '__SCANNED__';
type MaybeScanned = NotScanned | Scanned;

// Stryker restore all
/* v8 ignore stop */
