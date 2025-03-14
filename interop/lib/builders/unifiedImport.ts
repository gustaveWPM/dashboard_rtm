import {
  DAMERAU_LEVENSHTEIN_THRESHOLD,
  LANDING_PAGES_FOLDER,
  BLOG_POSTS_FOLDER,
  PAGES_FOLDER
} from '../../config/contentlayer/contentlayerConfigTweakers';
import { throwIfForbiddenToUseIndexErrorBlogCtx, throwIfForbiddenToUseIndexErrorLpCtx, getPathWithIndexSuffix } from './helpers';
import getPathWithoutExtension from '../../../packages/shared-lib/src/portable/str/getPathWithoutExtension';
import indexOfNthOccurrence from '../../../src/lib/portable/str/indexOfNthOccurrence';
import isValidLanguageFlag from '../../../src/lib/portable/i18n/isValidLanguageFlag';
import getFlattenedPathWithoutRootFolder from './getFlattenedPathWithoutRootFolder';
import { indexedBlogTagOptions } from '../../linkers/contentlayer/blog/tags';
import ForbiddenToUseIndexError from '../../errors/ForbiddenToUseIndex';
import { INDEX_TOKEN, BULLET } from '../misc/contentlayerCornerCases';
import { blogTagOptions } from '../../config/contentlayer/blog/tags';
import BlogAuthorDuplicates from '../../errors/BlogAuthorDuplicates';
import capitalize from '../../../src/lib/portable/str/capitalize';
import InvalidArgumentsError from '../../errors/InvalidArguments';
import BlogTagDuplicates from '../../errors/BlogTagDuplicates';
import InvalidBlogAuthor from '../../errors/InvalidBlogAuthor';
import InvalidBlogTag from '../../errors/InvalidBlogTag';
import { DEFAULT_LANGUAGE } from '../../config/i18n';
import ROUTES_ROOTS from '../../config/routes';

// https://github.com/contentlayerdev/contentlayer/issues/608
export {
  throwIfForbiddenToUseIndexErrorBlogCtx,
  throwIfForbiddenToUseIndexErrorLpCtx,
  getFlattenedPathWithoutRootFolder,
  DAMERAU_LEVENSHTEIN_THRESHOLD,
  ForbiddenToUseIndexError,
  getPathWithoutExtension,
  getPathWithIndexSuffix,
  InvalidArgumentsError,
  indexedBlogTagOptions,
  indexOfNthOccurrence,
  LANDING_PAGES_FOLDER,
  BlogAuthorDuplicates,
  isValidLanguageFlag,
  InvalidBlogAuthor,
  BlogTagDuplicates,
  BLOG_POSTS_FOLDER,
  DEFAULT_LANGUAGE,
  InvalidBlogTag,
  blogTagOptions,
  PAGES_FOLDER,
  ROUTES_ROOTS,
  INDEX_TOKEN,
  capitalize,
  BULLET
};
