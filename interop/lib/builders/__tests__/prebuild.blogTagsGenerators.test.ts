import type { EmptyString } from '@rtm/shared-types/CustomUtilityTypes';

import { describe, expect, it } from 'vitest';

import { createBlogTagOptionsVocabSchema, createIndexedBlogTagOptions } from '../blogTagsGenerators';

const emptyString: EmptyString = '';
const FAKE_BLOG_TAGS_OPTIONS = ['tag_one', 'tag_two', 'tag_three'] as const satisfies string[];

describe('generateBlogTagOptionsVocabSchema', () => {
  const blogTagOptionsVocabSchema = createBlogTagOptionsVocabSchema(FAKE_BLOG_TAGS_OPTIONS);

  it('should return a valid vocab schema, given blog tags options', () => {
    expect(blogTagOptionsVocabSchema).toStrictEqual({
      tag_three: emptyString,
      tag_one: emptyString,
      tag_two: emptyString
    });
  });

  it('should return an empty dictionnary, given empty blog tags options', () => {
    expect(createBlogTagOptionsVocabSchema([])).toStrictEqual({});
  });
});

describe('generateIndexedBlogTagOptions', () => {
  it('should return a valid indexes dictionnary, given blog tags options', () => {
    const indexedBlogTagOptions = createIndexedBlogTagOptions(FAKE_BLOG_TAGS_OPTIONS);

    expect(indexedBlogTagOptions).toStrictEqual({
      tag_three: 2,
      tag_one: 0,
      tag_two: 1
    });
  });

  it('should return an empty dictionnary, given empty blog tags options', () => {
    expect(createIndexedBlogTagOptions([])).toStrictEqual({});
  });
});
