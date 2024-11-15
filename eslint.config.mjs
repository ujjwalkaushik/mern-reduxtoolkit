import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/prop-types': 'off', // Disable prop-types validation
      'prefer-destructuring': ['error', { object: true, array: false }],
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }]
    },
  },
];
