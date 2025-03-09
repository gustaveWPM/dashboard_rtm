import type { WithOptionalProps, Rewire } from '@rtm/shared-types/CustomUtilityTypes';
import type { PagePath, PageRoot } from '@/types/Page';

import { INDEX_TOKEN } from '##/lib/misc/contentlayerCornerCases';
import { pipeable } from '@rtm/shared-lib/misc';

export type PagesConfigType<TestingRoot extends PageRoot, __Document extends object> = {
  SKIP_AUTOMOUNT: { prefixes: readonly string[]; paths: readonly PagePath[] };
  allPages: () => readonly __Document[];
  ENABLE_DRAFTS_IN_PROD: boolean;
  TESTING_ROOT: TestingRoot;
};

type Options<TestingRoot extends PageRoot, __Document extends object> = WithOptionalProps<
  PagesConfigType<TestingRoot, __Document>,
  'ENABLE_DRAFTS_IN_PROD' | 'SKIP_AUTOMOUNT'
> &
  Rewire<PagesConfigType<TestingRoot, __Document>, 'TESTING_ROOT', TestingRoot>;

const prepareSkipAutomountSection = <
  TestingRoot extends PageRoot,
  __Document extends object,
  __Options extends Options<TestingRoot, __Document> = Options<TestingRoot, __Document>
>() =>
  pipeable((options: __Options) =>
    options.SKIP_AUTOMOUNT !== undefined
      ? options
      : ({
          ...options,

          SKIP_AUTOMOUNT: {
            prefixes: [],
            paths: []
          }
        } as const)
  );

const forceToIncludeIndexTokenInSkipAutomountPathsAndCastDraftsInProdEnabler = <
  TestingRoot extends PageRoot,
  __Document extends object,
  __Options extends Options<TestingRoot, __Document> = Options<TestingRoot, __Document>
>() =>
  pipeable(
    (options: __Options) =>
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

export const createPagesConfig = <TestingRoot extends PageRoot, __Document extends object>(
  options: Options<TestingRoot, __Document>
): PagesConfigType<TestingRoot, __Document> =>
  prepareSkipAutomountSection<TestingRoot, __Document>().then(
    forceToIncludeIndexTokenInSkipAutomountPathsAndCastDraftsInProdEnabler<TestingRoot, __Document>()
  )(options);
