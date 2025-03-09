/* v8 ignore start */
// Stryker disable all

import type { CreateAuthorsNames } from '@rtm/shared-types/Blog';

import { createAuthorsNamesAndAuthorsEntries } from './builders/authors';
import { authors } from './authors';

export const [authorsNames, authorsEntries] = createAuthorsNamesAndAuthorsEntries(authors);

export type AuthorName = CreateAuthorsNames<typeof authorsNames>;

// Stryker restore all
/* v8 ignore stop */
