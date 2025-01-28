import globals from 'globals'
import pluginJs from '@eslint/js'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
    },
  },
  { languageOptions: { globals: globals.browser } },
  {
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/semi': ['error', 'never'],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
  },
  {
    ignores: ['dist/**'],
  },
]
