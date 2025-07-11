import baseConfig from './eslint.base.config.mjs';
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import unicorn from 'eslint-plugin-unicorn';

export default [
    ...baseConfig,
    {
        ignores: ['**/dist'],
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        ignores: ['**/*.test.ts', '**/*.spec.ts', '**/*.d.ts'],
        rules: {
            'max-lines-per-function': ['error', 50],
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.base.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@angular-eslint': angular,
            unicorn: unicorn,
        },
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allow: [],
                    depConstraints: [
                        {
                            sourceTag: 'domain',
                            onlyDependOnLibsWithTags: ['shared-domain'],
                        },
                        {
                            sourceTag: '*',
                            onlyDependOnLibsWithTags: ['*'],
                        },
                    ],
                },
            ],
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/prefer-readonly': 'error',
            '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
            '@angular-eslint/component-class-suffix': 'error',
            '@angular-eslint/directive-class-suffix': 'error',
            '@angular-eslint/no-input-rename': 'error',
            '@angular-eslint/no-output-rename': 'error',
            '@angular-eslint/use-lifecycle-interface': 'error',
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],
            complexity: ['error', 10],
            'max-depth': ['error', 4],
            'unicorn/filename-case': [
                'error',
                {
                    case: 'kebabCase',
                },
            ],
        },
    },
    {
        files: ['**/*.html'],
        plugins: {
            '@angular-eslint/template': angularTemplate,
        },
        rules: {
            '@angular-eslint/template/eqeqeq': 'error',
            '@angular-eslint/template/no-negated-async': 'error',
        },
    },
];
