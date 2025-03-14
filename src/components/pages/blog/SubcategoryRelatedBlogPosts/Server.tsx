import type { BlogPostPreviewComponentWithMetadatas, BlogCategoriesAndSubcategoriesAssoc, BlogSubcategoryPageProps, BlogTagId } from '@/types/Blog';
import type { BlogTag } from '##/config/contentlayer/blog/tags';
import type { FunctionComponent } from 'react';

import {
  getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict,
  isValidBlogCategoryAndSubcategoryPairInAnyLanguage,
  blogSubcategoryShouldTriggerNotFound
} from '@/lib/blog/api';
import BlogPostsNotFound from '@/components/ui/blog/BlogPostsNotFound';
import { indexedBlogTagOptions } from '##/lib/builders/unifiedImport';
import BlogPostPreview from '@/components/ui/blog/BlogPostPreview';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getScopedI18n } from '@/i18n/server';
import BlogConfig from '@/config/Blog/server';
import { notFound } from 'next/navigation';
import { i18ns } from '##/config/i18n';

import SubcategoryRelatedBlogPostsClient from './Client';

const SubcategoryRelatedBlogPosts: FunctionComponent<BlogSubcategoryPageProps> = async ({ params }) => {
  const [category, subcategory, language] = [params[BlogTaxonomy.CATEGORY], params[BlogTaxonomy.SUBCATEGORY], params[I18nTaxonomy.LANGUAGE]];

  const isValidPair: boolean = await isValidBlogCategoryAndSubcategoryPairInAnyLanguage(category, subcategory);
  if (!isValidPair) notFound();

  const postsCollection: BlogPostPreviewComponentWithMetadatas[] = (
    await getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict(category, subcategory, language)
  ).map((post) => ({
    blogPostPreviewComp: <BlogPostPreview key={`${post._raw.flattenedPath}-paginated-blog-post`} language={language} post={post} />,
    tagsIndexes: post.tagsIndexes,
    language: post.language,
    title: post.title,
    tags: post.tags,
    date: post.date,
    _id: post._id
  }));

  if (blogSubcategoryShouldTriggerNotFound(postsCollection)) notFound();
  // eslint-disable-next-line no-magic-numbers
  else if (postsCollection.length === 0) return <BlogPostsNotFound />;

  const tags = Array.from(
    new Set<BlogTag>(postsCollection.reduce<BlogTag[]>((accumulator, currentValue) => accumulator.concat(currentValue.tags), []))
  );

  const scopedT = await getScopedI18n(i18ns.blogCategories);
  const narrowedCategoryAndSubcategoryAssoc = `${category}.${subcategory}` as BlogCategoriesAndSubcategoriesAssoc;
  const title = scopedT(`${narrowedCategoryAndSubcategoryAssoc}.title`);

  const expectedTagsIds = new Set<BlogTagId>(tags.map((tag) => indexedBlogTagOptions[tag]));

  return (
    <SubcategoryRelatedBlogPostsClient
      elementsPerPage={BlogConfig.DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT}
      postsCollection={postsCollection}
      expectedTagsIds={expectedTagsIds}
      title={title}
      tags={tags}
    />
  );
};

export default SubcategoryRelatedBlogPosts;
