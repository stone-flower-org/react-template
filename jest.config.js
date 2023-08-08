module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'report/coverage',
  coveragePathIgnorePatterns: ['<rootDir>/src/utils/tests/'],
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 75,
      functions: 80,
      lines: 80,
    },
  },
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/src$1',
    '\\.svg$': '<rootDir>/src/utils/tests/mocks/svg.ts',
    '\\.css$': '<rootDir>/src/utils/tests/mocks/styles.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  testEnvironment: 'jsdom',
  transform: {
    '\\.[jt]sx?$': ['ts-jest', { isolatedModules: true }],
  },
};
