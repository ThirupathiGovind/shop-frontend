const path = require('path');
require('react-scripts/config/env');
const createJestConfig = require('react-scripts/scripts/utils/createJestConfig');

const config = createJestConfig(
  (relativePath) => path.resolve(__dirname, 'node_modules', 'react-scripts', relativePath),
  __dirname,
  false,
);

config.roots = ['<rootDir>/tests', '<rootDir>/src'];
config.testMatch = [
  '<rootDir>/tests/**/*.{spec,test}.{js,jsx}',
  '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
  '<rootDir>/src/**/*.{spec,test}.{js,jsx}',
];
config.setupFilesAfterEnv = ['<rootDir>/tests/setupTests.js'];

module.exports = config;
