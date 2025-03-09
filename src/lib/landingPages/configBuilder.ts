import type { WithOptionalProps } from '@rtm/shared-types/CustomUtilityTypes';
import type { LandingPageCategory } from '@/types/LandingPage';
import type { Document } from 'contentlayer/core';

export type LandingPagesConfigType<TestingCategory extends LandingPageCategory, __Document extends Document> = {
  allLandingPages: () => readonly __Document[];
  TESTING_CATEGORY: TestingCategory;
  ENABLE_DRAFTS_IN_PROD: boolean;
};

export const createLandingPagesConfig = <TestingCategory extends LandingPageCategory, __Document extends Document>(
  options: WithOptionalProps<LandingPagesConfigType<TestingCategory, __Document>, 'ENABLE_DRAFTS_IN_PROD'>
): LandingPagesConfigType<TestingCategory, __Document> =>
  ({
    ...options,
    ENABLE_DRAFTS_IN_PROD: Boolean(options.ENABLE_DRAFTS_IN_PROD)
  }) as const;
