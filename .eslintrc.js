const prettierConf = require('./.prettierrc');

const srcOverride = {
  env: {
    browser: true,
    es6: true,
    node: false,
  },
  extends: [
    'plugin:jest/recommended',
    'plugin:jest-dom/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
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
    '@typescript-eslint/no-empty-interface': ['warn'],
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
      rules: Object.assign(srcOverride.rules, {
        'no-console': ['warn', { allow: ['warn', 'error'] }],
      }),
    },
    {
      env: Object.assign(srcOverride.env, {
        jest: true,
      }),
      extends: srcOverride.extends,
      files: ['src/**/*.test.{js,jsx,ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 12,
        project: './tsconfig.json',
        sourceType: 'module',
      },
      rules: Object.assign(srcOverride.rules, {
        '@typescript-eslint/no-explicit-any': ['off'],
      }),
    },
  ],
  parser: 'esprima',
  plugins: ['@typescript-eslint', 'import', 'prettier', 'react', 'react-hooks', 'jest', 'jest-dom', 'jsx-a11y'],
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
            pattern: '@src/**',
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
        ignoreStrings: true,
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
