/* v8 ignore start */
// Stryker disable all

import type { CreateAuthorsNames } from '@rtm/shared-types/Blog';

import { createBlogAuthorsOptionsVocabSchema, createIndexedAuthorsNames } from '../../../lib/builders/blogAuthorsGenerators';
import { createAuthorsNamesAndAuthorsEntries } from '../../../config/contentlayer/blog/builders/authors';
import { authors } from '../../../config/contentlayer/blog/authors';

export const [authorsNames, authorsEntries] = createAuthorsNamesAndAuthorsEntries(authors);

export const [indexedBlogAuthorsNames, blogAuthorOptionsVocabSchema] = [
  createIndexedAuthorsNames(authorsNames),
  createBlogAuthorsOptionsVocabSchema(authorsNames)
];

export type AuthorName = CreateAuthorsNames<typeof authorsNames>;

// Stryker restore all
/* v8 ignore stop */
