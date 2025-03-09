import type { EmptyString } from '@rtm/shared-types/CustomUtilityTypes';
import type { Index, Id } from '@rtm/shared-types/Numbers';

const emptyString: EmptyString = '';

export const generateIndexedBlogTagOptions = <BlogTagOptions extends readonly string[]>(
  blogTagOptions: BlogTagOptions
): Record<BlogTagOptions[Index], Id> =>
  blogTagOptions.reduce<Record<string, Id>>((acc, tag, index) => {
    acc[tag] = index;
    return acc;
  }, {}) as Record<BlogTagOptions[Index], Id>;

export const generateBlogTagOptionsVocabSchema = <BlogTagOptions extends readonly string[]>(
  blogTagOptions: BlogTagOptions
): Record<BlogTagOptions[Index], EmptyString> =>
  blogTagOptions.reduce<Record<string, EmptyString>>((acc, tag) => {
    acc[tag] = emptyString;
    return acc;
  }, {}) as Record<BlogTagOptions[Index], EmptyString>;
