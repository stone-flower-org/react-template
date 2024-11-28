module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'report/coverage',
  coveragePathIgnorePatterns: ['<rootDir>/src/features/app/tests-utils/'],
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
    '\\.svg$': '<rootDir>/src/features/app/tests-utils/mocks/svg.ts',
    '\\.css$': '<rootDir>/src/features/app/tests-utils/mocks/styles.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  testEnvironment: 'jsdom',
  transform: {
    '\\.[jt]sx?$': ['ts-jest', { isolatedModules: true }],
  },
};
