const prettierConf = require('./.prettierrc');

const srcOverride = {
  env: {
    browser: true,
    es6: true,
    node: false,
  },
  extends: [
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': 'off', // conflicts with @typescript-eslint/no-unused-vars
    'react/jsx-boolean-value': ['error'],
    'react/jsx-sort-props': 'error',
    'react/prop-types': 'off',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    '@typescript-eslint/no-empty-interface': ['off'],
    '@typescript-eslint/no-explicit-any': ['warn'],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
};

module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:prettier/recommended'],
  ignorePatterns: ['dist/*', 'public/*'],
  overrides: [
    // sources
    {
      env: srcOverride.env,
      extends: srcOverride.extends,
      files: ['src/**'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 12,
        project: './tsconfig.json',
        sourceType: 'module',
      },
      rules: srcOverride.rules,
    },
    // tests
    {
      env: Object.assign(srcOverride.env, {
        node: true,
        'vitest-globals/env': true,
      }),
      extends: [...srcOverride.extends, 'plugin:vitest/recommended', 'plugin:vitest-globals/recommended'],
      files: ['src/**/*.test.{js,jsx,ts,tsx}', 'src/modules/app/tests-utils/**'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 12,
        project: './tsconfig.json',
        sourceType: 'module',
      },
      rules: Object.assign(srcOverride.rules, {}),
    },
  ],
  parser: 'esprima',
  plugins: ['@typescript-eslint', 'import', 'jsx-a11y', 'prettier', 'react', 'react-hooks', 'vitest'],
  root: true,
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: ['builtin', 'external', 'parent', ['sibling', 'index'], 'object', 'type'],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '@/src/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@/public/**',
            group: 'parent',
            position: 'before',
          },
        ],
      },
    ],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
      },
    ],
    'multiline-ternary': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../'],
      },
    ],
    'no-var': ['error'],
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    'prefer-const': 'error',
    'prettier/prettier': ['error', prettierConf],
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
