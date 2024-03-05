import type { EmptyString } from '@rtm/shared-types/CustomUtilityTypes';
import type { WriterFunction } from 'ts-morph';

import { VariableDeclarationKind, StructureKind, Project, Writers } from 'ts-morph';

import type { CategoriesMetadatas } from '../../types/Metadatas';

import {
  I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_PREFIX,
  I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS,
  I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS,
  AUTOGENERATED_CODE_COMMENT_STR,
  TS_MORPH_FORMATTER_SETTINGS,
  BLOG_CATEGORIES_CONST_STR,
  GENERATIONS_TARGET_FOLDER,
  TAB_SIZE
} from '../../config';

const emptyString: EmptyString = '';
const PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS = I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS.map(
  (field) => I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_PREFIX + field
);

type BlogCategoriesSchemaSubcategoryEntity = Record<string, unknown>;
type BlogCategoriesSchema = Record<string, BlogCategoriesSchemaSubcategoryEntity>;

function generateSchema(
  blogArchitecture: CategoriesMetadatas,
  __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS: string[],
  __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS: string[]
) {
  const schema = {} as BlogCategoriesSchema;

  for (const category in blogArchitecture) {
    const subcategories = blogArchitecture[category];

    schema[category] = {};
    for (const extraField of __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS) {
      schema[category][extraField] = emptyString;
    }

    for (const subcategory of Object.keys(subcategories)) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (__I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS.length <= 0) {
        schema[category][subcategory] = emptyString;
        continue;
      }
      const obj = {} as BlogCategoriesSchemaSubcategoryEntity;
      for (const extraField of __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS) {
        obj[extraField] = emptyString;
      }
      schema[category][subcategory] = obj;
    }
  }

  return schema;
}

function generateTrailingTrivia(__PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS: string[], __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS: string[]) {
  const CategoriesMetadatasBaseProps = 'Record<string, SubcategoriesMetadatas>';

  const CategoriesMetadatas =
    'type CategoriesMetadatas =' +
    ' ' +
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    (__PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS.length > 0
      ? [
          `Record<${__PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS.map((field) => `'${field}'`).join('|')}, EmptyString>`,
          CategoriesMetadatasBaseProps
        ].join('|')
      : CategoriesMetadatasBaseProps);

  const SubcategoriesMetadatas =
    'type SubcategoriesMetadatas =' +
    ' ' +
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    (__I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS.length > 0
      ? `Record<${__I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS.map((field) => `'${field}'`).join('|')}, EmptyString>`
      : 'EmptyString');

  return [
    "type EmptyString = '';",
    `${SubcategoriesMetadatas};`,
    `${CategoriesMetadatas};`,
    'type BlogCategoriesArtifact = Record<string, CategoriesMetadatas>'
  ].join('\n');
}

export default async function generateI18nBlogCategories(
  blogArchitecture: CategoriesMetadatas,
  pretty: boolean,
  __BLOG_CATEGORIES_CONST_STR: string = BLOG_CATEGORIES_CONST_STR,
  __TARGET_FOLDER: string = GENERATIONS_TARGET_FOLDER,
  __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS: string[] = PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS,
  __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS: string[] = I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS
) {
  const project = new Project();

  const initializerWriterFunction: WriterFunction = Writers.assertion(
    JSON.stringify(
      generateSchema(blogArchitecture, __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS, __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS),
      null,
      pretty ? TAB_SIZE : undefined
    ).replace(/""|''|``/g, '_'),
    'const satisfies BlogCategoriesArtifact;\n'
  );

  const sourceFile = project.createSourceFile(
    `${__TARGET_FOLDER}/${__BLOG_CATEGORIES_CONST_STR}.ts`,
    {
      statements: [
        {
          declarations: [
            {
              type: 'EmptyString',
              initializer: "''",
              name: '_'
            }
          ],
          declarationKind: VariableDeclarationKind.Const,
          kind: StructureKind.VariableStatement
        },
        {
          declarations: [
            {
              trailingTrivia: generateTrailingTrivia(__PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS, __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS),
              initializer: initializerWriterFunction,
              name: __BLOG_CATEGORIES_CONST_STR
            }
          ],
          declarationKind: VariableDeclarationKind.Const,
          kind: StructureKind.VariableStatement,
          isExported: false
        }
      ]
    },
    { overwrite: true }
  );
  const oldTextLength = sourceFile.getText().length;

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  sourceFile.insertText(0, AUTOGENERATED_CODE_COMMENT_STR);

  sourceFile.insertText(oldTextLength + AUTOGENERATED_CODE_COMMENT_STR.length, `export default ${__BLOG_CATEGORIES_CONST_STR};`);
  if (pretty) sourceFile.formatText(TS_MORPH_FORMATTER_SETTINGS);
  await sourceFile.save();
}
