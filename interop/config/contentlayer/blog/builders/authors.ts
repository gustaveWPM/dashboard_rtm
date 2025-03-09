/* v8 ignore start */
// Stryker disable all

import type { Author } from '../types/authors';

export const createAuthorsNamesAndAuthorsEntries = <Authors extends Record<PropertyKey, Author>>(authors: Authors) =>
  [Object.keys(authors) as (keyof Authors)[], Object.entries(authors) as [keyof Authors, Author][]] as const;

// Stryker restore all
/* v8 ignore stop */
