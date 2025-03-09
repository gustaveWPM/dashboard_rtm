/* v8 ignore start */
// Stryker disable all

import type { Index } from './Numbers';

// {ToDo} Move this into a shared-blog-types package
export type CreateAuthorsNames<AuthorNames extends readonly string[]> = AuthorNames[Index];

// Stryker restore all
/* v8 ignore stop */
