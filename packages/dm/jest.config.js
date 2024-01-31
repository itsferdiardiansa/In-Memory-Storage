const config = {
  verbose: true,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/__tests__/**/*.(ts)'],
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
  },
}

export default config
