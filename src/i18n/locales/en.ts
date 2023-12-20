/* v8 ignore start */
import type { SharedVocabType, VocabType } from '@rtm/shared-types/I18n';

import { SHARED_TESTING_BLOG_CATEGORY_METADATAS } from '../lazybones';
import capitalize from '../../lib/portable/str/capitalize';

const SHARED: SharedVocabType = {
  'pages-titles': {
    'patch-notes-bis': 'Patch Notes (bis)',
    'discord-bot-bis': 'Discord Bot (bis)',

    'dashboard-bis': 'Dashboard (bis)',
    'patch-notes': 'Patch Notes',
    'discord-bot': 'Discord Bot',

    dashboard: 'Dashboard',
    homepage: 'Homepage',
    'sign-up': 'Sign up'
  },
  vocab: {
    brand: 'Rust Team Management',
    breadcrumbs: 'Breadcrumbs',
    logo: 'logo',
    page: 'page'
  }
};

export default {
  'blog-categories': {
    'patch-notes-bis': {
      'discord-bot-bis': {
        'meta-description': 'Metadescription Patch-notes -> Bot Discord (bis)',
        title: SHARED['pages-titles']['discord-bot-bis']
      },
      'dashboard-bis': {
        'meta-description': 'Metadescription Patch-notes -> Dashboard (bis)',
        title: SHARED['pages-titles']['dashboard-bis']
      },

      '_meta-description': 'Metadescription Patch Notes (bis)',
      _title: SHARED['pages-titles']['patch-notes-bis']
    },

    'patch-notes': {
      'discord-bot': {
        'meta-description': 'Patch-notes -> Discord Bot - Metadescription',
        title: SHARED['pages-titles']['discord-bot']
      },
      dashboard: {
        'meta-description': 'Patch-notes -> Dashboard - Metadescription',
        title: SHARED['pages-titles'].dashboard
      },

      '_meta-description': 'Patch Notes Metadescription',
      _title: SHARED['pages-titles']['patch-notes']
    },

    testing: SHARED_TESTING_BLOG_CATEGORY_METADATAS
  },

  navbar: {
    'sr-only': {
      'close-hamburger-menu': 'Close the navbar menu (website sections)',
      'open-hamburger-menu': 'Open the navbar menu (website sections)',
      'close-language-switcher-menu': 'Close language choice menu',
      'open-language-switcher-menu': 'Open language choice menu',
      'switch-to-light-mode': 'Switch to light mode',
      'switch-to-dark-mode': 'Switch to dark mode',
      'language-switcher-menu': 'Language choice',
      'hamburger-menu': 'Website sections'
    },
    assistance: 'Assistance'
  },

  vocab: {
    ...SHARED.vocab,
    'sr-only': {
      'brand-logo': `${capitalize(SHARED.vocab.brand)}'s ${SHARED.vocab.logo}`
    },
    'no-blog-post': 'Nobody here but us chickens!',
    'copy-to-clipboard': 'Copy to clipboard',
    'invite-the-bot': 'Invite the bot',
    '404': '404 - Page not found!',
    'see-more': 'See more!',
    loading: 'Loading...',
    'brand-short': 'RTM',
    prev: 'Previous',
    next: 'Next'
  },

  dashboard: {
    'sr-only': {
      'hide-sidebar': 'Hide the sidebar',
      'show-sidebar': 'Show the sidebar'
    },
    'pages-titles': {
      main: 'Main',
      foo: 'Foo',
      bar: 'Bar'
    }
  },

  'manual-SEO': {
    homepage: {
      'meta-description': 'This is the homepage metadescription'
    },

    signup: {
      'meta-description': 'Dashboard portal metadescription'
    }
  },

  auth: {
    signup: SHARED['pages-titles']['sign-up'],
    logout: 'Logout',
    login: 'Login'
  },

  'pages-titles': SHARED['pages-titles'],

  _infos: { lng: 'en' }
} as const satisfies VocabType;
/* v8 ignore stop */
