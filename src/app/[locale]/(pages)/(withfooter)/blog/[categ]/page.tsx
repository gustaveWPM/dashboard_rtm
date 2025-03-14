/* v8 ignore start */
// Stryker disable all

import type { BlogCategoryPageProps } from '@/types/Blog';

import CategoryRelatedSubcategoriesAndBlogPosts from '@/components/pages/blog/CategoryRelatedSubcategoriesAndBlogPosts';
import { getBlogCategoryMetadatas, getBlogStaticParams, blogCategoryGuard } from '@/lib/blog/staticGeneration';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import { setStaticParamsLocale } from 'next-international/server';
import { buildAbsolutePathFromParts } from '@rtm/shared-lib/str';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import BlogTaxonomy from '##/config/taxonomies/blog';
import ROUTES_ROOTS from '##/config/routes';

export async function generateMetadata({ params }: BlogCategoryPageProps) {
  blogCategoryGuard({ params });
  const blogCategoryMetadatas = await getBlogCategoryMetadatas({ params });

  return blogCategoryMetadatas;
}

export async function generateStaticParams() {
  const staticParams = await getBlogStaticParams();
  return staticParams;
}

export default function Page({ params }: BlogCategoryPageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  const category = params[BlogTaxonomy.CATEGORY];
  const pathname = buildAbsolutePathFromParts(ROUTES_ROOTS.BLOG, category);

  return (
    <div className="mx-8 flex flex-col items-center lg:mx-auto lg:max-w-[750px]" data-pagefind-ignore="all">
      <Breadcrumbs className="my-4 w-fit self-start" pathname={pathname} />
      <CategoryRelatedSubcategoriesAndBlogPosts params={params} />
    </div>
  );
}

// Stryker restore all
/* v8 ignore stop */
