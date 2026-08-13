module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^react-native$': '<rootDir>/__tests__/mocks/react-native.js',
    '^@react-native-async-storage/async-storage$': '<rootDir>/__tests__/mocks/async-storage.js',
    '^@react-navigation/native$': '<rootDir>/__tests__/mocks/react-navigation.js',
    '^@react-navigation/native-stack$': '<rootDir>/__tests__/mocks/react-navigation-stack.js',
    '^@react-navigation/bottom-tabs$': '<rootDir>/__tests__/mocks/react-navigation-tabs.js',
    '^react-native-safe-area-context$': '<rootDir>/__tests__/mocks/safe-area-context.js',
  },
  setupFilesAfterEnv: [],
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/types/**',
    '!src/mocks/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'json', 'clover', 'cobertura'],
  reporters: ['default', 'jest-junit'],
};
