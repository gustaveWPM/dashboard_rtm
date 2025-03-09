import type { WithOptionalProps, Rewire } from '@rtm/shared-types/CustomUtilityTypes';
import type { PagePath, PageRoot } from '@/types/Page';
import type { Document } from 'contentlayer/core';

import { INDEX_TOKEN } from '##/lib/misc/contentlayerCornerCases';
import { pipeable } from '@rtm/shared-lib/misc';

type PagesConfigType<TestingRoot extends PageRoot, __Document extends Document> = {
  SKIP_AUTOMOUNT: { prefixes: readonly string[]; paths: readonly PagePath[] };
  allPages: () => readonly __Document[];
  ENABLE_DRAFTS_IN_PROD: boolean;
  TESTING_ROOT: TestingRoot;
};

type Options<TestingRoot extends PageRoot, __Document extends Document> = WithOptionalProps<
  PagesConfigType<TestingRoot, __Document>,
  'ENABLE_DRAFTS_IN_PROD' | 'SKIP_AUTOMOUNT'
> &
  Rewire<PagesConfigType<TestingRoot, __Document>, 'TESTING_ROOT', TestingRoot>;

const prepareSkipAutomountSection = <
  TestingRoot extends PageRoot,
  __Document extends Document,
  __Options extends Options<TestingRoot, __Document> = Options<TestingRoot, __Document>
>() =>
  pipeable(
    (options: __Options): PagesConfigType<TestingRoot, __Document> =>
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
  __Document extends Document,
  __Options extends Options<TestingRoot, __Document> = Options<TestingRoot, __Document>
>() =>
  pipeable(
    (options: __Options): PagesConfigType<TestingRoot, __Document> =>
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

export const createPagesConfig = <TestingRoot extends PageRoot, __Document extends Document>(
  options: Options<TestingRoot, __Document>
): PagesConfigType<TestingRoot, __Document> =>
  prepareSkipAutomountSection<TestingRoot, __Document>().then(forceToIncludeIndexTokenInSkipAutomountPaths<TestingRoot, __Document>())(options);
