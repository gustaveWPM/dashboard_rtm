const [_OFF, _WARN, _ERROR] = [0, 1, 2];
const [, , ERROR] = [_OFF, _WARN, _ERROR];

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['next/core-web-vitals'],
  plugins: ['@typescript-eslint', 'import', 'unused-imports', 'only-error'],

  rules: {
    'import/no-duplicates': ERROR,
    'import/first': ERROR,
    'import/no-extraneous-dependencies': [ERROR, { devDependencies: false }],

    'unused-imports/no-unused-imports': ERROR,

    'no-unused-vars': [ERROR, { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'no-unreachable': [ERROR],
    '@typescript-eslint/consistent-type-imports': [ERROR, { fixStyle: 'separate-type-imports' }],
    'import/consistent-type-specifier-style': [ERROR, 'prefer-top-level']
  },

  overrides: [
    {
      files: ['vitest.config.ts', '*.test.ts', '*.test-d.ts', '*Adapter.js'],
      rules: {
        'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }]
      }
    }
  ]
};
