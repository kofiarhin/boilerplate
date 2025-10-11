module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/server'],
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/server/tests/setup.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'server/**/*.js',
    '!server/server.js',
    '!server/tests/**'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
