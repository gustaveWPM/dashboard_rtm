import type { TPageTaxonomy } from '##/config/taxonomies/pages';

import type { I18nParams } from './Next';

type PagePropsParams = TPageTaxonomy;

export interface PageProps {
  params: PagePropsParams & I18nParams;
}
