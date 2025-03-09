import type { WithOptionalProps, Rewire } from '@rtm/shared-types/CustomUtilityTypes';
import type { PagePath, PageRoot } from '@/types/Page';

import { INDEX_TOKEN } from '##/lib/misc/contentlayerCornerCases';

export type PagesConfigType<TestingRoot extends PageRoot, Document extends object> = {
  SKIP_AUTOMOUNT: { prefixes: readonly string[]; paths: readonly PagePath[] };
  allPages: () => readonly Document[];
  ENABLE_DRAFTS_IN_PROD: boolean;
  TESTING_ROOT: TestingRoot;
};

type Options<TestingRoot extends PageRoot, Document extends object> = WithOptionalProps<
  PagesConfigType<TestingRoot, Document>,
  'ENABLE_DRAFTS_IN_PROD' | 'SKIP_AUTOMOUNT'
> &
  Rewire<PagesConfigType<TestingRoot, Document>, 'TESTING_ROOT', TestingRoot>;

const forceToIncludeIndexTokenInSkipAutomountPathsAndCastDraftsInProdEnabler = <
  TestingRoot extends PageRoot,
  Document extends object,
  __Options extends Options<TestingRoot, Document> = Options<TestingRoot, Document>
>(
  options: __Options
) =>
  ({
    ...options,

    SKIP_AUTOMOUNT: {
      paths: [...(options.SKIP_AUTOMOUNT?.paths ?? []), INDEX_TOKEN as any],
      prefixes: options.SKIP_AUTOMOUNT?.prefixes ?? []
    },

    ENABLE_DRAFTS_IN_PROD: Boolean(options.ENABLE_DRAFTS_IN_PROD)
  }) as const;

export const createPagesConfig = <TestingRoot extends PageRoot, Document extends object>(
  options: Options<TestingRoot, Document>
): PagesConfigType<TestingRoot, Document> => forceToIncludeIndexTokenInSkipAutomountPathsAndCastDraftsInProdEnabler(options);
