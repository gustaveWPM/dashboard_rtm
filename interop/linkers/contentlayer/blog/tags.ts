/* v8 ignore start */
// Stryker disable all

import { createBlogTagOptionsVocabSchema, createIndexedBlogTagOptions } from '../../../lib/builders/blogTagsGenerators';
import { blogTagOptions } from '../../../config/contentlayer/blog/tags';

export const [indexedBlogTagOptions, blogTagOptionsVocabSchema] = [
  createIndexedBlogTagOptions(blogTagOptions),
  createBlogTagOptionsVocabSchema(blogTagOptions)
];

// Stryker restore all
/* v8 ignore stop */
