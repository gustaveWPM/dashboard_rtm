import type { BlogCategoriesAndSubcategoriesAssoc, BlogSubcategoryFromUnknownCategory, BlogCategory, BlogPostType } from '@/types/Blog';
import type LanguageFlag from '@rtm/shared-types/LanguageFlag';
import type { ReactElement } from 'react';

import buildPathFromParts from '@rtm/shared-lib/portable/str/buildPathFromParts';
import BlogPostsNotFound from '@/components/ui/blog/BlogPostsNotFound';
import BlogPostPreview from '@/components/ui/blog/BlogPostPreview';
import BUTTON_CONFIG from '@/components/config/styles/buttons';
import { getBlogSubcategoriesByCategory } from '@/cache/blog';
import { getServerSideI18n } from '@/i18n/server';
import { Button } from '@/components/ui/Button';
import BlogConfig from '@/config/Blog/server';
import cn from '@/lib/portable/tailwind/cn';
import GithubSlugger from 'github-slugger';
import { i18ns } from '##/config/i18n';
import Link from 'next/link';

const slugger = new GithubSlugger();

// {ToDo} https://github.com/Tirraa/dashboard_rtm/issues/126
async function blogCategoryPageBuilder(
  posts: BlogPostType[],
  category: BlogCategory,
  language: LanguageFlag
): Promise<ReactElement[] | ReactElement> {
  function buildHistogram() {
    for (const post of posts) {
      const curSubcateg = post.subcategory as BlogSubcategoryFromUnknownCategory;
      if (histogram[curSubcateg] === undefined) continue;

      // eslint-disable-next-line no-magic-numbers
      if (histogram[curSubcateg].length < limit + 1 && post.language === language) {
        histogram[curSubcateg].push(post);
        // eslint-disable-next-line no-magic-numbers
        if (Object.values(histogram).every((posts2) => posts2.length >= limit + 1)) break;
      }
    }
  }

  function buildPostsCollectionsSnippets() {
    for (const [subcategory, posts2] of Object.entries(histogram)) {
      postsCollectionsSnippets[subcategory as BlogSubcategoryFromUnknownCategory] = posts2.map((post) => (
        <BlogPostPreview key={`${post._raw.flattenedPath}-post-snippet`} isNotOnBlogSubcategoryPage language={language} post={post} />
      ));
    }
  }

  // eslint-disable-next-line no-magic-numbers
  const isEmptySnippets = () => Object.values(postsCollectionsSnippets).every((posts2) => posts2.length === 0);

  function contentGenerator(): ReactElement[] {
    const result: ReactElement[] = [];
    let isLast = false;
    const max = Object.entries(postsCollectionsSnippets).length;
    let counter = 0;

    for (const [subcategory, posts] of Object.entries(postsCollectionsSnippets)) {
      ++counter;
      isLast = counter >= max;
      // eslint-disable-next-line no-magic-numbers
      if (posts.length === 0) continue;
      const narrowedCategoryAndSubcategoryAssoc = `${category}.${subcategory}` as BlogCategoriesAndSubcategoriesAssoc;
      const curSubcategTitle = globalT(`${i18ns.blogCategories}.${narrowedCategoryAndSubcategoryAssoc}.title`);
      const href = buildPathFromParts(category, subcategory);
      const title = (
        <Link
          className="mb-4 flex h-fit w-fit border-b-[2px] border-transparent leading-none transition-all hover:border-b-[2px] hover:border-inherit hover:pr-2 hover:indent-1 focus:border-b-[2px] focus:border-inherit focus:pr-2 focus:indent-1"
          href={href}
        >
          <h2 className="mb-1 mt-2">{curSubcategTitle}</h2>
        </Link>
      );

      let showMoreLink = null;
      if (posts.length > limit) {
        showMoreLink = (
          <div className="flex w-full justify-center">
            <Button className={cn(BUTTON_CONFIG.CLASSNAME, 'mt-4 lg:mb-0')} size="lg" asChild>
              <Link href={href}>{globalT(`${i18ns.vocab}.see-more`)}</Link>
            </Button>
          </div>
        );
        posts.pop();
      }

      const sep = <hr className="color-inherit m-auto my-5 w-36 opacity-50" key={`${subcategory}-${curSubcategTitle}-sep`} />;

      const section = (
        <section
          className="my-4 [&>article:not(:last-of-type)]:mb-6"
          key={`${subcategory}-${curSubcategTitle}-section`}
          id={slugger.slug(curSubcategTitle)}
        >
          {title}
          {posts}
          {showMoreLink}
        </section>
      );

      result.push(section);
      // eslint-disable-next-line no-magic-numbers
      if (!isLast && !showMoreLink && max > 1) result.push(sep);
    }

    return result;
  }

  // eslint-disable-next-line no-magic-numbers
  if (posts.length === 0) return <BlogPostsNotFound />;

  const globalT = await getServerSideI18n();
  const subcategs: BlogSubcategoryFromUnknownCategory[] = await getBlogSubcategoriesByCategory(category, language);
  const entries: [BlogSubcategoryFromUnknownCategory, unknown[]][] = subcategs.map((subcateg) => [subcateg, []]);
  const { pagesTitles } = i18ns;

  const sortedEntries = entries.sort(([entry1], [entry2]) =>
    BlogConfig.DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_SUBCATEGORIES_ON_BLOG_CATEGORY_PAGE(
      globalT(`${pagesTitles}.${entry1}`),
      globalT(`${pagesTitles}.${entry2}`),
      language
    )
  );

  const [histogram, postsCollectionsSnippets] = [
    Object.fromEntries(entries) as Record<BlogSubcategoryFromUnknownCategory, BlogPostType[]>,
    Object.fromEntries(sortedEntries) as Record<BlogSubcategoryFromUnknownCategory, ReactElement[]>
  ];
  const limit = BlogConfig.DISPLAYED_BLOG_POSTS_PER_SUBCATEGORY_ON_BLOG_CATEGORY_PAGE_LIMIT;

  buildHistogram();
  buildPostsCollectionsSnippets();
  if (isEmptySnippets()) return <BlogPostsNotFound />;

  const result: ReactElement[] = contentGenerator();
  return result;
}

export default blogCategoryPageBuilder;
