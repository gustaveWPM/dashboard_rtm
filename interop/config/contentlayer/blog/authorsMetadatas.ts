/* v8 ignore start */
// Stryker disable all

import { createBlogAuthorsOptionsVocabSchema, createIndexedAuthorsNames } from '../../../lib/builders/blogAuthorsGenerators';
import { authorsNames } from './authorsLinker';

export const [indexedBlogAuthorsNames, blogAuthorOptionsVocabSchema] = [
  createIndexedAuthorsNames(authorsNames),
  createBlogAuthorsOptionsVocabSchema(authorsNames)
];

// Stryker restore all
/* v8 ignore stop */
