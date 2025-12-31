import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
	// JS / JSX
	{
		files: ['**/*.{js,mjs,cjs,jsx}'],
		extends: [
			js.configs.recommended,
			prettierConfig, // отключает конфликтующие правила
		],
		plugins: {
			react: pluginReact,
			'react-hooks': reactHooks,
			import: importPlugin,
			prettier: prettierPlugin,
		},
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: globals.browser,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			// React
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',

			// Hooks
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			// Импорты
			'import/order': [
				'warn',
				{
					groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
			'import/no-unresolved': 'off', // Vite / TS сам разберётся

			// Prettier как правило ESLint
			'prettier/prettier': 'warn',

			// Общие
			'no-unused-vars': 'warn',
			'no-console': 'warn',
		},
	},

	// TS / TSX
	{
		files: ['**/*.{ts,tsx}'],
		extends: [tseslint.configs.recommended, prettierConfig],
		plugins: {
			import: importPlugin,
			prettier: prettierPlugin,
		},
		rules: {
			'import/order': [
				'warn',
				{
					groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
		},
	},
])
