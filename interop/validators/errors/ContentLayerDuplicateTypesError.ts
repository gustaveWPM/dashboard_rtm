/* v8 ignore start */
class ContentLayerDuplicateTypesError extends Error {
  constructor(duplicates: unknown[]) {
    super(`[${duplicates.join(', ')}] ${duplicates.length > 1 ? 'are' : 'is'} defined several times.`);
    this.name = 'ContentLayerDuplicateTypesError';
  }
}

export default ContentLayerDuplicateTypesError;
/* v8 ignore stop */
