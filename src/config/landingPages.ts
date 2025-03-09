import { createLandingPagesConfig } from '@/lib/landingPages/configBuilder';
import { allLandingPages } from 'contentlayer/generated';

const LandingPagesConfig = createLandingPagesConfig({
  TESTING_CATEGORY: 'landing-pages-testing-category',
  allLandingPages: () => allLandingPages
});

export default LandingPagesConfig;
