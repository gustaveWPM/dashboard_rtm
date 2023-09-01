import { defineDocumentType, makeSource } from 'contentlayer/source-files';

const contentDirPath = 'posts';

export const PhantomPost = defineDocumentType(() => ({
  name: 'PhantomPost',
  filePathPattern: '',
  fields: {
    title: { type: 'string', required: true },
    metadescription: { type: 'string', required: true },
    description: { type: 'string', required: false },
    date: { type: 'date', required: true },
    url: { type: 'string', required: true }
  }
}));

export const PatchPost = defineDocumentType(() => ({
  name: 'PatchPost',
  filePathPattern: '**/patch-notes/**/*.md',
  fields: {
    title: { type: 'string', required: true },
    metadescription: { type: 'string', required: true },
    description: { type: 'string', required: false },
    date: { type: 'date', required: true }
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/${post._raw.flattenedPath}` }
  }
}));

export const DummyPost = defineDocumentType(() => ({
  name: 'DummyPost',
  filePathPattern: '**/nouveau-blog-lol/**/*.md',
  fields: {
    title: { type: 'string', required: true },
    metadescription: { type: 'string', required: true },
    description: { type: 'string', required: false },
    date: { type: 'date', required: true }
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/${post._raw.flattenedPath}` }
  }
}));

export default makeSource({ contentDirPath, documentTypes: [PhantomPost, PatchPost, DummyPost] });
