module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/cypress/', '<rootDir>/api/'],
  moduleNameMapper: {
    '@shared(.*)': '<rootDir>/src/app/shared/$1',
    '@features(.*)': '<rootDir>/src/app/features/$1',
    '@core(.*)': '<rootDir>/src/app/core/$1',
  },
  roots: ['<rootDir>', '<rootDir>/jest'],
};
