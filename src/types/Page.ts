/* v8 ignore start */
// Stryker disable all
import type { TPageTaxonomy } from '##/config/taxonomies/pages';
import type Pages from '@rtm/generated/Pages';

import type PageAdapter from './Adapters/PageAdapter';
import type { I18nParams } from './Next';

type PagePropsParams = TPageTaxonomy;

export interface PageProps {
  params: PagePropsParams & I18nParams;
}

export type UnknownPagePath = string;
export type PageRoot = StrictPage['root'];

type StrictPage = {
  [Category in keyof Pages]: PageAdapter<Pages[Category][number]>;
}[keyof Pages];

export type PageLang = StrictPage['lang'];
export type PagePath<L extends PageLang> = Extract<StrictPage, { lang: L }>['path'];
// Stryker restore all
/* v8 ignore stop */
