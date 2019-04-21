module.exports = {
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.html$',
      tsConfig: '<rootDir>/tsconfig.spec.json',
      astTransformers: [require.resolve('jest-preset-angular/InlineHtmlStripStylesTransformer')],
      diagnostics: true,
    },
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  testMatch: [
    '**/__tests__/**/*.+(ts|js)?(x)',
    '**/+(*.)+(spec|test).+(ts|js)?(x)',
  ],
  moduleFileExtensions: [
    'ts',
    'js',
    'html',
    'json',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx)',
  ],
  testEnvironment: 'jest-environment-jsdom-thirteen',
  snapshotSerializers: [
    require.resolve('jest-preset-angular/AngularSnapshotSerializer'),
    require.resolve('jest-preset-angular/HTMLCommentSerializer'),
  ],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  rootDir: './',
  coverageDirectory: '<rootDir>/../coverage',
};
