/* v8 ignore start */
// Stryker disable all
// @ts-check

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const [_OFF, _WARN, _ERROR] = [0, 1, 2];
const [OFF, , ERROR] = [_OFF, _WARN, _ERROR];

/** @type {import("eslint").Linter.Config} */
module.exports = {
  rules: {
    '@typescript-eslint/no-unused-vars': [ERROR, { ignoreRestSiblings: false, args: 'after-used', vars: 'all' }],
    '@typescript-eslint/consistent-type-imports': [ERROR, { fixStyle: 'separate-type-imports' }],
    'import/no-extraneous-dependencies': [ERROR, { devDependencies: false }],
    'import/consistent-type-specifier-style': [ERROR, 'prefer-top-level'],
    '@typescript-eslint/no-magic-numbers': ERROR,
    'unused-imports/no-unused-imports': ERROR,
    'import/no-duplicates': ERROR,

    'no-unreachable': ERROR,
    'require-await': ERROR,
    'no-unused-vars': OFF,
    'import/first': ERROR
  },

  extends: [
    'next/core-web-vitals',
    'plugin:promise/recommended',
    'plugin:perfectionist/recommended-alphabetical',
    'plugin:perfectionist/recommended-natural',
    'plugin:perfectionist/recommended-line-length'
  ],

  overrides: [
    {
      rules: {
        'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }]
      },
      files: ['vitest.config.ts', '*.test.ts', '*.test.tsx', '*.test-d.ts', '*Adapter.js']
    }
  ],

  plugins: ['@typescript-eslint', 'import', 'unused-imports', 'only-error', 'perfectionist']
};

// Stryker restore all
/* v8 ignore stop */
