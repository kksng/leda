module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/dist/',
    '/cypress/',
  ],
  testURL: 'http://localhost/',
  setupFilesAfterEnv: ['<rootDir>/testsConfig.ts'],
  setupFiles: [
    'jest-date-mock',
  ],
  extraGlobals: [
    'document',
  ],
  bail: true,
  verbose: true,
  testMatch: null,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'node'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)x?$',
};
