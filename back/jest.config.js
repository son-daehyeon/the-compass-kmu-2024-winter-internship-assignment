module.exports = {
  moduleFileExtensions: ['js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'node',
  testMatch: [
    '**/test/**/*.test.js',
  ],
  collectCoverageFrom: [
    'src/domain/**/*.js',
  ],
}; 