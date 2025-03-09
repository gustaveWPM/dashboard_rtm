import type { WithOptionalProps } from '@rtm/shared-types/CustomUtilityTypes';
import type { LandingPageCategory } from '@/types/LandingPage';

export type LandingPagesConfigType<TestingCategory extends LandingPageCategory, Document extends object> = {
  allLandingPages: () => readonly Document[];
  TESTING_CATEGORY: TestingCategory;
  ENABLE_DRAFTS_IN_PROD: boolean;
};

export const createLandingPagesConfig = <TestingCategory extends LandingPageCategory, Document extends object>(
  options: WithOptionalProps<LandingPagesConfigType<TestingCategory, Document>, 'ENABLE_DRAFTS_IN_PROD'>
): LandingPagesConfigType<TestingCategory, Document> =>
  ({
    ...options,
    ENABLE_DRAFTS_IN_PROD: Boolean(options.ENABLE_DRAFTS_IN_PROD)
  }) as const;
