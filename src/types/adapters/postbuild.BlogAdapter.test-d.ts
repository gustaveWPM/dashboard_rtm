// Stryker disable all

// Error will not be thrown in test ctx
import type { DefaultLanguageToken } from '@rtm/generated';

import { expectAssignable, expectType } from 'jest-tsd';
// Error will not be thrown in test ctx
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, it } from 'vitest';

import type BlogAdapter from './BlogAdapter';

const _ = {};

describe('BlogAdapter (Valid structure)', () => {
  it('should pass (empty structure)', () => {
    const fake = _ as BlogAdapter<{}>;

    expectType<{}>(fake);
  });

  it('should pass (mono-empty-category structure)', () => {
    const fake = _ as BlogAdapter<{ 'dummy-category': {} }>;

    expectType<{ 'dummy-category': {} }>(fake);
  });

  it('should pass (mono-category structure, different slugs)', () => {
    const fake = _ as BlogAdapter<{
      'patch-notes': {
        dashboard: {
          [_ in DefaultLanguageToken]: 'post-01';
        } & {
          en: 'post-02';
        };
      };
    }>;

    expectAssignable<typeof fake>({
      'patch-notes': {
        dashboard: {
          [DEFAULT_LANGUAGE]: 'post-01',
          en: 'post-02'
        }
      }
    } as const);
  });

  it('should pass (mono-category structure, same slugs)', () => {
    const fake = _ as BlogAdapter<{
      'patch-notes': {
        dashboard: {
          [_ in DefaultLanguageToken]: 'post-01';
        } & {
          en: 'post-01';
        };
      };
    }>;

    expectAssignable<typeof fake>({
      'patch-notes': {
        dashboard: {
          [DEFAULT_LANGUAGE]: 'post-01',
          en: 'post-01'
        }
      }
    } as const);
  });

  it('should pass (mixed structure, different slugs)', () => {
    const fake = _ as BlogAdapter<{
      'patch-notes-bis': {
        'dashboard-bis': {
          [_ in DefaultLanguageToken]: 'post-01';
        } & {
          en: 'post-02';
        };
      };

      'patch-notes': {
        dashboard: {
          [_ in DefaultLanguageToken]: 'post-01';
        } & {
          en: 'post-02';
        };
      };
    }>;

    expectAssignable<typeof fake>({
      'patch-notes-bis': {
        'dashboard-bis': {
          [DEFAULT_LANGUAGE]: 'post-01',
          en: 'post-02'
        }
      },

      'patch-notes': {
        dashboard: {
          [DEFAULT_LANGUAGE]: 'post-01',
          en: 'post-02'
        }
      }
    } as const);
  });

  it('should pass (mixed category structure, same slugs)', () => {
    const fake = _ as BlogAdapter<{
      'patch-notes-bis': {
        'dashboard-bis': {
          [_ in DefaultLanguageToken]: 'post-01';
        } & {
          en: 'post-01';
        };
      };

      'patch-notes': {
        dashboard: {
          [_ in DefaultLanguageToken]: 'post-01';
        } & {
          en: 'post-01';
        };
      };
    }>;

    expectAssignable<typeof fake>({
      'patch-notes-bis': {
        'dashboard-bis': {
          [DEFAULT_LANGUAGE]: 'post-01',
          en: 'post-01'
        }
      },

      'patch-notes': {
        dashboard: {
          [DEFAULT_LANGUAGE]: 'post-01',
          en: 'post-01'
        }
      }
    } as const);
  });
});

// Stryker restore all
