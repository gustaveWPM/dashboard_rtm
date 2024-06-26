import type { MaybeObjectValue, MaybeUndefined, MaybeNull, Couple } from '@rtm/shared-types/CustomUtilityTypes';
import type { AlternateURLs } from 'next/dist/lib/metadata/types/alternative-urls-types';
import type { UnknownLandingPageSlug, LandingPageProps } from '@/types/LandingPage';
import type { I18nMiddlewareConfig, LanguageFlag } from '@rtm/shared-types/I18n';
import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import type { LandingPage } from 'contentlayer/generated';
import type { Href } from '@rtm/shared-types/Next';
import type { Metadata } from 'next';

import buildPageTitle from '@rtm/shared-lib/portable/str/buildPageTitle';
import LandingPageTaxonomy from '##/config/taxonomies/landingPages';
import { DEFAULT_LANGUAGE, LANGUAGES, i18ns } from '##/config/i18n';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getServerSideI18n } from '@/i18n/server';
import { notFound } from 'next/navigation';

import getPathnameWithoutI18nFlag from '../notPortable/i18n/getPathnameWithoutI18nFlag';
import doGetLandingPagesStaticParams from './static/getLandingPagesStaticParams';
import { getLandingPageByLanguageAndSlugUnstrict } from './api';

/* v8 ignore start */
// Stryker disable all

export function getLandingPagesStaticParams() {
  const landingPagesStaticParams = doGetLandingPagesStaticParams();
  return landingPagesStaticParams;
}

function getXDefaultAndCanonical(
  currentLp: LandingPage,
  slug: UnknownLandingPageSlug,
  language: LanguageFlag,
  middlewareStrategy: I18nMiddlewareConfig['urlMappingStrategy']
): Couple<MaybeUndefined<Href>, Href> {
  const maybeDefaultLanguageLp = getLandingPageByLanguageAndSlugUnstrict(language, slug);

  const defaultUrl = middlewareStrategy !== 'redirect' ? getPathnameWithoutI18nFlag(currentLp.url) : currentLp.url;

  const xDefault = language !== DEFAULT_LANGUAGE && maybeDefaultLanguageLp !== null ? defaultUrl : undefined;

  const canonical = language === DEFAULT_LANGUAGE ? defaultUrl : currentLp.url;
  return [xDefault, canonical];
}

export async function getLandingPageMetadatas(
  { params }: LandingPageProps,
  middlewareStrategy: I18nMiddlewareConfig['urlMappingStrategy'],
  metadataBase: MaybeObjectValue<URL> = process.env.METADABASE_URL ? new URL(process.env.METADABASE_URL) : undefined
): Promise<Metadata> {
  const [language, slug] = [params[I18nTaxonomy.LANGUAGE], params[LandingPageTaxonomy.SLUG]];
  const currentLp: MaybeNull<LandingPage> = getLandingPageByLanguageAndSlugUnstrict(language, slug);
  if (!currentLp) notFound();

  const globalT = await getServerSideI18n();
  const { metadescription: description, featuredPictureUrl, title: lpTitle, seo, url } = currentLp;

  const { vocab } = i18ns;
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), lpTitle);

  const maybeAlternateLanguages = LANGUAGES.filter((lang) => lang !== language);
  const languages = {} as Record<LanguageFlag | 'x-default', Href>;

  for (const maybeAlternateLanguage of maybeAlternateLanguages) {
    const maybeLp = getLandingPageByLanguageAndSlugUnstrict(maybeAlternateLanguage, slug);
    if (maybeLp === null) continue;
    languages[maybeAlternateLanguage] = maybeLp.url;
  }

  const [xDefault, canonical] = getXDefaultAndCanonical(currentLp, slug, language, middlewareStrategy);
  if (xDefault !== undefined) languages['x-default'] = xDefault;

  const defaultOpenGraph: OpenGraph = { url };
  if (featuredPictureUrl !== undefined) defaultOpenGraph.images = [{ url: featuredPictureUrl }];

  if (seo === undefined) return { alternates: { canonical, languages }, openGraph: defaultOpenGraph, metadataBase, description, title };

  const { openGraph = defaultOpenGraph, alternates, robots } = seo;

  if ((openGraph as OpenGraph).url === undefined) (openGraph as OpenGraph).url = url;
  if (alternates) (alternates as AlternateURLs).languages = languages;
  if (alternates && !alternates.canonical) (alternates as AlternateURLs).canonical = canonical;
  if (featuredPictureUrl !== undefined) openGraph.images = [{ url: featuredPictureUrl }];

  return { metadataBase, description, alternates, openGraph, robots, title };
}

// Stryker restore all
/* v8 ignore stop */
