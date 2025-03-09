/* v8 ignore start */
// Stryker disable all

import type { Index } from './Numbers';

export type CreateAuthorsNames<AuthorNames extends readonly string[]> = AuthorNames[Index];

// Stryker restore all
/* v8 ignore stop */
