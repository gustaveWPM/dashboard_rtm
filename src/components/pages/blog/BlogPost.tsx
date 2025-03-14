import type { BlogPostPageProps, BlogPostProps, BlogPostType } from '@/types/Blog';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { WithClassname } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import { isValidBlogCategoryAndSubcategoryPair, getBlogPostUnstrict } from '@/lib/blog/api';
import BlogPostTocDesktop from '@/components/ui/blog/toc/desktop/BlogPostTocDesktop';
import BlogPostTocMobile from '@/components/ui/blog/toc/mobile/BlogPostTocMobile';
import BlogPostMDX from '@/components/layouts/blog/MdxComponent';
import tagsGenerator from '@/components/ui/blog/tagsGenerator';
import BlogPostDate from '@/components/ui/blog/BlogPostDate';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getScopedI18n } from '@/i18n/server';
import BlogConfig from '@/config/Blog/server';
import cn from '@/lib/portable/tailwind/cn';
import { notFound } from 'next/navigation';
import { i18ns } from '##/config/i18n';

interface BlogPostInnerProps extends BlogPostProps {}
interface _BlogPostPageProps extends BlogPostPageProps, Partial<WithClassname> {}

const BlogPostInner: FunctionComponent<BlogPostInnerProps> = async ({ className: classNameValue, language, post }) => {
  const scopedT = await getScopedI18n(i18ns.vocab);
  const scopedT2 = await getScopedI18n(i18ns.blogTags);

  // eslint-disable-next-line no-magic-numbers
  const hasTags = post.tags.length > 0;
  // eslint-disable-next-line no-magic-numbers
  const showToC = post.headings.length > 1;
  const showDraftSuffix = BlogConfig.SHOW_DRAFTS_BADGE && post.draft;
  const draftSuffix = showDraftSuffix ? ' (' + scopedT('draft') + ')' : undefined;

  return (
    <section className={cn('mx-12 w-auto max-w-[730px] lg:w-[45vw]', classNameValue)}>
      <header className="my-2 p-2 text-center">
        <h1>{post.title}</h1>
        <BlogPostDate suffix={draftSuffix} language={language} date={post.date} />
        {hasTags && (
          <div className="mt-1 flex flex-wrap justify-center gap-2 md:mx-auto md:w-fit md:justify-normal" data-pagefind-ignore="all">
            {tagsGenerator({ ...post, scopedT: scopedT2 })}
          </div>
        )}
      </header>
      <div className="flex max-w-full flex-col lg:flex-row">
        {showToC && <BlogPostTocMobile headings={post.headings} />}
        <BlogPostMDX code={post.body.code} />
        {showToC && <BlogPostTocDesktop headings={post.headings} />}
      </div>
    </section>
  );
};

const BlogPost: FunctionComponent<_BlogPostPageProps> = async ({ className: classNameValue, params }) => {
  const [category, subcategory, language] = [params[BlogTaxonomy.CATEGORY], params[BlogTaxonomy.SUBCATEGORY], params[I18nTaxonomy.LANGUAGE]];

  const isValidPair: boolean = await isValidBlogCategoryAndSubcategoryPair(category, subcategory, language);
  if (!isValidPair) notFound();

  const slug = params[BlogTaxonomy.SLUG];

  const post: MaybeNull<BlogPostType> = await getBlogPostUnstrict(category, subcategory, slug, language);
  if (!post) notFound();

  return <BlogPostInner className={classNameValue} language={language} post={post} />;
};

export default BlogPost;
