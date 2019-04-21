module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  rootDir: './',
  testRegex: '.integration.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
