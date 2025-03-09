import type { EmptyString } from '@rtm/shared-types/CustomUtilityTypes';
import type { Index, Id } from '@rtm/shared-types/Numbers';

const emptyString: EmptyString = '';

export const createIndexedAuthorsNames = <AuthorsNames extends readonly string[]>(authorsNames: AuthorsNames): Record<AuthorsNames[Index], Id> =>
  authorsNames.reduce<Record<string, Id>>((acc, tag, index) => {
    acc[tag] = index;
    return acc;
  }, {}) as Record<AuthorsNames[Index], Id>;

export const createBlogAuthorsOptionsVocabSchema = <AuthorsNames extends readonly string[]>(
  authorsNames: AuthorsNames
): Record<AuthorsNames[Index], AuthorVocabArborescence> =>
  authorsNames.reduce<Record<string, AuthorVocabArborescence>>((acc, tag) => {
    acc[tag] = { alt: emptyString, bio: emptyString };
    return acc;
  }, {}) as Record<AuthorsNames[Index], AuthorVocabArborescence>;

type AuthorVocabArborescence = { alt: EmptyString; bio: EmptyString };
