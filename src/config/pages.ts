import { allPages } from 'contentlayer/generated';

import { createPagesConfig } from '../lib/pages/configBuilder';

const PagesConfig = createPagesConfig({
  TESTING_ROOT: 'testing-pages-root',
  allPages: () => allPages
});

export default PagesConfig;
