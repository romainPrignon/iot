import eslint from '@eslint/js'
import vitest from '@vitest/eslint-plugin'
import n from 'eslint-plugin-n'
import promise from 'eslint-plugin-promise'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const eslintExtra = {
  rules: {
    eqeqeq: 'error',
    'no-duplicate-imports': 'error',
    'no-promise-executor-return': 'error',
    'no-throw-literal': 'error',
    'block-scoped-var': 'error',
    'no-invalid-this': 'off',
    'no-param-reassign': 'error',
    'default-param-last': 'off',
    'require-atomic-updates': 'error'
  }
}

export const tseslintExtra = {
  rules: {
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
    '@typescript-eslint/no-invalid-this': 'error',
    '@typescript-eslint/default-param-last': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error'
  }
}

export const vitestExtra = {
  rules: {
    'vitest/no-focused-tests': 'error'
  }
}

export const promiseExtra = {
  rules: {
    'promise/valid-params': 'error',
    'promise/no-multiple-resolved': 'error'
  }
}

export const disabled = {
  rules: {
    camelcase: 'off', // not everything should be in camelcase
    'no-unused-vars': 'off', // override by typescript
    'no-multiple-empty-lines': 'off', // give us some space
    'no-use-before-define': 'off', // ts code is compiled to js code. order does not matter
    'n/no-extraneous-import': 'off', // handle by ts and vscode
    'n/no-unpublished-import': 'off', // handle by ts and vscode
    'n/no-missing-import': 'off' // handle by ts and vscode
  }
}

export default defineConfig([
  ...tseslint.configs.recommended, // enable typescript syntax
  {
    files: ['**/*.{js,ts}']
  },
  {
    plugins: { promise, n, vitest }
  },
  {
    languageOptions: {
      ecmaVersion: 2023, // node 22
      sourceType: 'module'
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2023,
        ...globals.jest,
      }
    }
  },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      }
    }
  },
  {
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslint.configs.eslintRecommended.rules, // disables rules from eslint:recommended which are already handled by ts
      ...tseslint.configs.recommended.rules,
      ...vitest.configs.recommended.rules,
      ...promise.configs.recommended.rules,
      ...n.configs['flat/recommended-module'].rules, // n rules for modules
      // extra rules
      ...eslintExtra.rules,
      ...vitestExtra.rules,
      ...tseslintExtra.rules,
      ...promiseExtra.rules,
      // disabled rules
      ...disabled.rules,
    }
  },
  {
    files: ['**/*.test.{js,ts}'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off'
    }
  }
])
