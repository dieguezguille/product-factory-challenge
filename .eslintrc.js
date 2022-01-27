module.exports = require('@sumup/foundry/eslint')(
  {
    language: 'TypeScript',
    environments: ['Browser'],
    frameworks: ['React'],
    openSource: false,
  },
  {
    rules: {
      'linebreak-style': 0,
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
);
