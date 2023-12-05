import type { DocumentContentType, FieldDefs } from 'contentlayer/source-files';
import type { BaseFields, DOCUMENTS_COMPUTED_FIELDS, DocumentsComputedFieldsKey, DocumentsTypesKey } from '../ContentlayerConfigTweakers';

type ContentLayerContentType = { contentType: DocumentContentType };

type ComputedFieldsKey = keyof typeof DOCUMENTS_COMPUTED_FIELDS;
export type ComputedFieldsAsFieldsRecord = {
  [Key in ComputedFieldsKey]: Key extends keyof BaseFields ? BaseFields[Key] : never;
};

type ComputedField<K extends keyof BaseFields> = Pick<BaseFields[K], 'type'> & { resolve: (post: PostToBuild) => unknown };

type ComputedFieldsMappedToPartialBaseFieldsSumType<K extends keyof BaseFields> = Record<K, ComputedField<K>>;

type CategoryFolder = string;
type FilePathPattern = string;
type PostSchemaKey = 'PostSchema';
export type TypeName = DocumentsTypesKey | PostSchemaKey;

type DocumentsConfigTypeContentLayerMetadatas<T extends TypeName = TypeName> = {
  name: T;
  filePathPattern: FilePathPattern;
};

type DocumentsConfigTypeMetadatas<T extends TypeName = TypeName> = {
  name: T;
  categoryFolder: CategoryFolder;
};

export type DocumentsTypesMetadatas = Record<DocumentsTypesKey, DocumentsConfigTypeMetadatas<DocumentsTypesKey>>;

// * ... https://github.com/microsoft/TypeScript/issues/56080
export type DocumentsConfigType<ComputedFields extends keyof BaseFields = never> = /*__CAST `never` TO__*/ {} & ComputedFields extends never
  ? DocumentsConfigTypeContentLayerMetadatas & { fields: BaseFields }
  : DocumentsConfigTypeContentLayerMetadatas & {
      fields: Omit<BaseFields, ComputedFields>;
      computedFields: ComputedFieldsMappedToPartialBaseFieldsSumType<ComputedFields>;
    };

export type ComputedFields = Record<keyof BaseFields, ComputedField<keyof BaseFields>>;

export type MakeDocumentsBaseFieldsSumType<T extends keyof BaseFields> = T;
export type MakeDocumentsTypesSumType<T extends string> = T;

export type DocumentsFields = Omit<BaseFields, DocumentsComputedFieldsKey>;
export type DocumentsComputedFields = Pick<ComputedFields, DocumentsComputedFieldsKey>;
export type AtomicDocumentConfig = DocumentsConfigType<DocumentsComputedFieldsKey>;
export type AtomicContentLayerDocumentConfig = AtomicDocumentConfig & ContentLayerContentType;
export type ContentLayerDocumentsConfigType = DocumentsConfigType & ContentLayerContentType;

export type MakeBaseFields<__BASE_FIELDS extends FieldDefs> = __BASE_FIELDS;

export type PostToBuild = any;
