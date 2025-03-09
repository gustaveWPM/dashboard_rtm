import type { WithOptionalProps, Rewire } from '@rtm/shared-types/CustomUtilityTypes';
import type { PagePath, PageRoot } from '@/types/Page';
import type { Page } from 'contentlayer/generated';

import { INDEX_TOKEN } from '##/lib/misc/contentlayerCornerCases';
import { pipeable } from '@rtm/shared-lib/misc';

type PagesConfigType<TestingRoot extends PageRoot> = {
  SKIP_AUTOMOUNT: { prefixes: readonly string[]; paths: readonly PagePath[] };
  allPages: () => readonly Page[];
  ENABLE_DRAFTS_IN_PROD: boolean;
  TESTING_ROOT: TestingRoot;
};

type Options<TestingRoot extends PageRoot> = WithOptionalProps<PagesConfigType<TestingRoot>, 'ENABLE_DRAFTS_IN_PROD' | 'SKIP_AUTOMOUNT'> &
  Rewire<PagesConfigType<TestingRoot>, 'TESTING_ROOT', TestingRoot>;

const prepareSkipAutomountSection = <TestingRoot extends PageRoot, __Options extends Options<TestingRoot> = Options<TestingRoot>>() =>
  pipeable(
    (options: __Options): PagesConfigType<TestingRoot> =>
      options.SKIP_AUTOMOUNT !== undefined
        ? ({
            ...options,
            ENABLE_DRAFTS_IN_PROD: Boolean(options.ENABLE_DRAFTS_IN_PROD),
            SKIP_AUTOMOUNT: options.SKIP_AUTOMOUNT
          } as const)
        : ({
            SKIP_AUTOMOUNT: {
              prefixes: [],
              paths: []
            },

            ENABLE_DRAFTS_IN_PROD: Boolean(options.ENABLE_DRAFTS_IN_PROD),
            TESTING_ROOT: options.TESTING_ROOT,
            allPages: options.allPages
          } as const)
  );

const forceToIncludeIndexTokenInSkipAutomountPaths = <
  TestingRoot extends PageRoot,
  __Options extends Options<TestingRoot> = Options<TestingRoot>
>() =>
  pipeable(
    (options: __Options): PagesConfigType<TestingRoot> =>
      ({
        SKIP_AUTOMOUNT: {
          paths: [...(options.SKIP_AUTOMOUNT?.paths ?? []), INDEX_TOKEN as any],
          prefixes: options.SKIP_AUTOMOUNT?.prefixes ?? []
        },

        ENABLE_DRAFTS_IN_PROD: Boolean(options.ENABLE_DRAFTS_IN_PROD),
        TESTING_ROOT: options.TESTING_ROOT,
        allPages: options.allPages
      }) as const
  );

export const createPagesConfig = <TestingRoot extends PageRoot>(options: Options<TestingRoot>): PagesConfigType<TestingRoot> =>
  prepareSkipAutomountSection<TestingRoot>().then(forceToIncludeIndexTokenInSkipAutomountPaths<TestingRoot>())(options);
