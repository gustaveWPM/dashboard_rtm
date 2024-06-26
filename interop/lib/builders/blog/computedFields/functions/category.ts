import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { Index } from '@rtm/shared-types/Numbers';
import type { BlogCategory } from '@/types/Blog';

import { throwIfForbiddenToUseIndexErrorBlogCtx, getFlattenedPathWithoutRootFolder, BLOG_POSTS_FOLDER } from '../../../unifiedImport';

/**
 * @throws {InvalidArgumentsError}
 */
function buildBlogPostCategoryFromStr(path: string): BlogCategory {
  // eslint-disable-next-line no-magic-numbers
  const categBuilder = (path: string, firstSlashIndex: Index): BlogCategory => path.substring(0, firstSlashIndex) as BlogCategory;

  const firstSlashIndex = path.indexOf('/');
  const categ = categBuilder(path, firstSlashIndex);
  return categ;
}

/**
 * @throws {ForbiddenToUseIndexError}
 */
function buildBlogPostCategoryFromPostObj(post: DocumentToCompute): BlogCategory {
  const { sourceFilePath, flattenedPath } = post._raw;

  throwIfForbiddenToUseIndexErrorBlogCtx(sourceFilePath);

  const path = getFlattenedPathWithoutRootFolder(flattenedPath, BLOG_POSTS_FOLDER);
  const blogPostCategory = buildBlogPostCategoryFromStr(path);
  return blogPostCategory;
}

const buildBlogPostCategory = (post: DocumentToCompute): BlogCategory => buildBlogPostCategoryFromPostObj(post);

export default buildBlogPostCategory;
