import { languages } from '@/app/i18n/settings';
import { blogSubCategoriesByCategory } from '@/app/proxies/blog';
import BlogPost from '@/components/blog/BlogPost';
import BlogConfig, { BlogCategory } from '@/config/blog';
import { getAllPostsByCategoryAndSubCategory, getBlogCategoryFromPathname, getBlogPostSlug, getPost } from '@/lib/blog';
import getServerSidePathnameWorkaround from '@/lib/misc/getServerSidePathname';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogPostPageProps, BlogStaticParams, BlogStaticParamsValue, BlogSubCategory } from '@/types/Blog';
import { PartialRecord } from '@/types/UglyTypes';
import { notFound } from 'next/navigation';

export function generateMetadata({ params }: BlogPostPageProps) {
  const categ = getBlogCategoryFromPathname(getServerSidePathnameWorkaround()) as BlogCategory;
  const subCateg = params[BlogTaxonomy.subCategory];
  const slug = params[BlogTaxonomy.slug];
  const lang = params[i18nTaxonomy.langFlag];

  const post = getPost(categ, subCateg, slug, lang);
  if (!post) notFound();

  return { title: post.title, description: post.metadescription };
}

export async function generateStaticParams() {
  function generateBlogStaticParams(): BlogStaticParams[] {
    const existingParams = new Set<string>();
    const blogStaticParams: PartialRecord<keyof BlogStaticParams, BlogStaticParamsValue>[] = [];
    const blogCategories = Object.keys(BlogConfig.blogCategoriesAllPostsTypesAssoc);

    blogCategories.forEach((category) => {
      const categ = category as BlogCategory;
      const curSubCategs = blogSubCategoriesByCategory(categ);

      curSubCategs.forEach((subCateg) => {
        const subcateg = subCateg as BlogSubCategory;
        const relatedPosts = getAllPostsByCategoryAndSubCategory(categ, subcateg);

        relatedPosts.forEach((post) => {
          const slug = getBlogPostSlug(post);
          const staticParamsKey = `${categ}-${subcateg}-${slug}`;

          if (existingParams.has(staticParamsKey)) return;

          existingParams.add(staticParamsKey);
          const entity: BlogStaticParams = { [BlogTaxonomy.category]: categ, [BlogTaxonomy.subCategory]: subcateg, [BlogTaxonomy.slug]: slug };
          blogStaticParams.push(entity);
        });
      });
    });
    return blogStaticParams as BlogStaticParams[];
  }

  const blogStaticParamsEntities = generateBlogStaticParams();
  const staticParams = languages.flatMap((lng) =>
    blogStaticParamsEntities.map((entity) => ({
      lng,
      ...entity
    }))
  );

  return staticParams;
}

export default function Page({ params }: BlogPostPageProps) {
  return <BlogPost {...{ params }} />;
}
