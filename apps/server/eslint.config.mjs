import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/*.controller.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];
