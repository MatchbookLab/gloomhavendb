module.exports = {
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.html$',
      tsConfig: '<rootDir>/tsconfig.spec.json',
      astTransformers: [
        'jest-preset-angular/build/InlineFilesTransformer',
        'jest-preset-angular/build/StripStylesTransformer'
      ],
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
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  rootDir: './',
  coverageDirectory: '<rootDir>/../coverage',
};
