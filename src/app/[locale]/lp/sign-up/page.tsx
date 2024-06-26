/* v8 ignore start */
// Stryker disable all

import type { Page } from 'contentlayer/generated';
import type { I18nPageProps } from '@/types/Next';

import buildPageTitle from '@rtm/shared-lib/portable/str/buildPageTitle';
import { setStaticParamsLocale } from 'next-international/server';
import LandingPageMDX from '@/components/layouts/lp/MdxComponent';
import { getPageByLanguageAndPathStrict } from '@/lib/pages/api';
import { getStaticParams, getScopedI18n } from '@/i18n/server';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { i18ns } from '##/config/i18n';

export async function generateMetadata({ params }: I18nPageProps) {
  const scopedT = await getScopedI18n(i18ns.vocab);
  const language = params[I18nTaxonomy.LANGUAGE];

  const document = getPageByLanguageAndPathStrict({ path: 'lp/sign-up', lang: language }) as Page;

  const { metadescription: description, title: documentTitle } = document;
  const title = buildPageTitle(scopedT('brand-short'), documentTitle);

  return { description, title };
}

export function generateStaticParams() {
  return getStaticParams();
}

export default function Page({ params }: I18nPageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  const document = getPageByLanguageAndPathStrict({ path: 'lp/sign-up', lang: language }) as Page;
  return <LandingPageMDX code={document.body.code} />;
}

// Stryker restore all
/* v8 ignore stop */
