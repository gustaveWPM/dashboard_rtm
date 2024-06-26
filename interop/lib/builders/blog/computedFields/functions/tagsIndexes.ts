import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { Limit, Index } from '@rtm/shared-types/Numbers';

import { DAMERAU_LEVENSHTEIN_THRESHOLD, BlogTagDuplicates, InvalidBlogTag, BULLET } from '../../../unifiedImport';

function validateTagNames<BlogTagOption extends string>(
  tagsArrayUniq: BlogTagOption[],
  indexedBlogTagOptions: Record<BlogTagOption, Index>,
  blogTagOptions: readonly BlogTagOption[],
  __DAMERAU_THRESHOLD: Limit
): MaybeNull<InvalidBlogTag> {
  const defects: string[] = [];

  for (const tag of tagsArrayUniq) {
    if (indexedBlogTagOptions[tag] === undefined) {
      defects.push(tag);
      continue;
    }
  }

  // eslint-disable-next-line no-magic-numbers
  if (defects.length > 0) return new InvalidBlogTag(defects, blogTagOptions, __DAMERAU_THRESHOLD);
  return null;
}

function validateTagNoDuplicates(tagsArray: string[]): MaybeNull<BlogTagDuplicates> {
  const tagsMemory: unknown[] = [];
  const duplicatesSet = new Set<unknown>();

  for (const currentTag of tagsArray) {
    if (tagsMemory.includes(currentTag)) {
      duplicatesSet.add(currentTag);
      continue;
    }
    tagsMemory.push(currentTag);
  }

  const duplicates = Array.from(duplicatesSet);
  // eslint-disable-next-line no-magic-numbers
  if (duplicates.length > 0) return new BlogTagDuplicates(duplicates);
  return null;
}

/**
 * @throws {[InvalidBlogTag, BlogTagDuplicates]}
 */
function buildBlogTagsIndexesFromPostObj<BlogTagOption extends string>(
  tagsArray: BlogTagOption[],
  indexedBlogTagOptions: Record<BlogTagOption, Index>,
  blogTagOptions: readonly BlogTagOption[],
  __DAMERAU_THRESHOLD: Limit
): Index[] {
  const tagsArrayUniq = Array.from(new Set<BlogTagOption>(tagsArray));

  const maybeValidateTagNamesError = validateTagNames(tagsArrayUniq, indexedBlogTagOptions, blogTagOptions, __DAMERAU_THRESHOLD);
  const maybeValidateTagsNoDuplicatesError = validateTagNoDuplicates(tagsArray);

  const mergedErrors = [maybeValidateTagNamesError, maybeValidateTagsNoDuplicatesError].filter((e) => e !== null);

  // eslint-disable-next-line no-magic-numbers
  if (mergedErrors.length > 0) throw mergedErrors.join('\n' + BULLET + ' ');

  const res: Index[] = [];
  for (const tag of tagsArrayUniq) res.push(indexedBlogTagOptions[tag]);

  return res;
}

const buildBlogTagsIndexes = <BlogTagOption extends string>(
  post: DocumentToCompute,
  indexedBlogTagOptions: Record<BlogTagOption, Index>,
  blogTagOptions: readonly BlogTagOption[],
  __DAMERAU_THRESHOLD: Limit = DAMERAU_LEVENSHTEIN_THRESHOLD
): Index[] => buildBlogTagsIndexesFromPostObj(post.tags._array as BlogTagOption[], indexedBlogTagOptions, blogTagOptions, __DAMERAU_THRESHOLD);

export default buildBlogTagsIndexes;
