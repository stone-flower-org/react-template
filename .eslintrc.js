module.exports = {
  env: {
    browser: true,
    es2020: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'plugin:jest-dom/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['dist/*', 'public/*'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['*.js'],
      parser: 'esprima',
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 11,
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'prettier', 'react', 'react-hooks', 'jest', 'jest-dom', '@emotion'],
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        groups: ['builtin', 'external', 'parent', ['sibling', 'index'], 'object', 'type'],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '@src/**',
            group: 'parent',
            position: 'before',
          },
        ],
      },
    ],
    'multiline-ternary': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../../'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        trailingComma: 'es5',
        singleAttributePerLine: true,
      },
    ],
    'react/self-closing-comp': ['error', { component: true, html: true }],
    '@emotion/syntax-preference': [2, 'string'],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
    },
    react: {
      version: 'detect',
    },
  },
};
