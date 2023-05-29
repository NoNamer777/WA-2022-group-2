/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 * @type {import('jest').Config}
 */
export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.js',
    '!<rootDir>/src/app/**/*.controllers.js',
    '!<rootDir>/src/app/**/*.router.js',
    '!<rootDir>/src/app/app.js'
  ],
  coverageDirectory: '../../coverage/server',
  coveragePathIgnorePatterns: ['/node_modules/', '/client/'],
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  displayName: 'Wasted: Server',
  passWithNoTests: true,
  reporters: undefined,
  randomize: true,
  roots: ['<rootDir>'],
  setupFiles: [],
  setupFilesAfterEnv: [],
  testMatch: ['<rootDir>/src/app/**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/', '/client/']
};
