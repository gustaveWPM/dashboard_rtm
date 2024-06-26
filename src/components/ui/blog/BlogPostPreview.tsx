/* v8 ignore start */
// Stryker disable all

import type { WithLanguage } from '@rtm/shared-types/Next';
import type { BlogPostType } from '@/types/Blog';
import type { FunctionComponent } from 'react';

import { getBlogPostPathWithoutI18nPart, getSlicedBlogPostDescription } from '@/lib/blog/api';
import { getScopedI18n } from '@/i18n/server';
import BlogConfig from '@/config/Blog/server';
import cn from '@/lib/portable/tailwind/cn';
import { i18ns } from '##/config/i18n';
import Image from 'next/image';
import Link from 'next/link';

import { CardDescription, CardContent, CardHeader, CardFooter, CardTitle, Card } from '../Card';
import BlogPostPreviewAuthors from './BlogPostPreviewAuthors';
import tagsGenerator from './tagsGenerator';
import BlogPostDate from './BlogPostDate';
import DraftBadge from './DraftBadge';

interface BlogPostPreviewProps extends WithLanguage {
  post: Pick<BlogPostType, 'featuredPictureUrl' | 'metadescription' | 'authorsIndexes' | 'description' | 'draft' | 'title' | 'tags' | 'date' | 'url'>;
  isNotOnBlogSubcategoryPage?: boolean;
}

const BlogPostPreview: FunctionComponent<BlogPostPreviewProps> = async ({ isNotOnBlogSubcategoryPage, language, post }) => {
  const scopedT = await getScopedI18n(i18ns.blogTags);
  const { metadescription, description, draft, title, date, tags, url } = post;

  const descriptionSnippet = description ? getSlicedBlogPostDescription(description) : getSlicedBlogPostDescription(metadescription);
  // eslint-disable-next-line no-magic-numbers
  const hasTags = tags.length > 0;
  // eslint-disable-next-line no-magic-numbers
  const hasAuthors = post.authorsIndexes.length > 0;
  const showDraftSuffix = BlogConfig.SHOW_DRAFTS_BADGE && draft;
  const href = getBlogPostPathWithoutI18nPart(language, url);

  return (
    <article>
      <div className="group relative flex h-full w-full flex-col transition-transform duration-300 hover:z-[2] hover:delay-0 hover:duration-100 focus:z-[2] focus:delay-0 focus:duration-100 dark:hover:brightness-125 dark:focus:brightness-125 lg:hover:scale-105 lg:focus:scale-105">
        <Card className="flex h-full flex-col lg:flex-row">
          {post.featuredPictureUrl && (
            <div className="h-[60%] bg-black bg-opacity-40 max-lg:w-full max-lg:rounded-t-lg lg:h-auto lg:ltr:rounded-l-lg lg:rtl:rounded-r-lg">
              <Image
                className="h-[max(200px,30vw)] w-full object-cover max-lg:rounded-t-lg lg:h-full lg:w-[200px] lg:ltr:rounded-l-lg lg:rtl:rounded-r-lg"
                src={post.featuredPictureUrl}
                aria-hidden="true"
                height={384}
                width={384}
                priority
                alt=""
              />
            </div>
          )}
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <CardHeader className="pb-2">
                <CardTitle titleType={isNotOnBlogSubcategoryPage ? 'h3' : 'h2'} className="is-h3 flex justify-between">
                  {title}
                  {showDraftSuffix && <DraftBadge className="relative bottom-1 left-2 rtl:-left-2" />}
                </CardTitle>
                <CardDescription>
                  <BlogPostDate className="bg-secondary p-1 text-black dark:text-white" language={language} date={date} />
                </CardDescription>
              </CardHeader>
              <CardContent
                className={cn('p-6 pt-0', {
                  'pb-3': hasTags
                })}
              >
                {hasAuthors && <BlogPostPreviewAuthors authorsIndexes={post.authorsIndexes} title={title} href={href} />}
                <div className="break-word text-sm [&>*:last-child]:mb-0 [&>*]:mb-3">{descriptionSnippet}</div>
              </CardContent>
            </div>
            {hasTags && <CardFooter className="flex flex-wrap gap-2">{tagsGenerator({ language, scopedT, tags })}</CardFooter>}
          </div>
        </Card>

        <Link className="absolute inset-0 z-[1]" href={href}>
          <span className="sr-only">{title}</span>
        </Link>
      </div>
    </article>
  );
};

export default BlogPostPreview;

// Stryker restore all
/* v8 ignore stop */
