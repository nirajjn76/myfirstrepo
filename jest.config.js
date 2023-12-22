const path = require("path");
const esModules = ['react-pdf'].join('|');

module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ['<rootDir>/src'],
  testEnvironment: "jsdom",
  preset: 'ts-jest',
  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    "^.+\\.(ts|tsx)?$": 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],

  // Runs special logic, adding special
  // extended assertions to Jest
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect'
  ],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|txt)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\^(.*)esm/entry.webpack":"<rootDir>/__mocks__/workerMock.js",
    "^(.*)esm/entry.webpack": "$1umd/entry.jest"
  },

  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  coverageThreshold: {
    global: { statements: 50, branches: 45, functions: 40, lines: 50 }
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: ["src/**/*.ts", "src/**/*.tsx", "!src/index.tsx", "!src/reportWebVitals.ts", "!src/setupTests.ts", "!src/httpConfig/*ts", "!src/components/Auth/*.tsx", "!src/components/HttpInterceptor/*.tsx", "!src/components/Dashboard/**/*.tsx", "!src/pages/Dashboard.tsx", "!src/App.tsx"]
}
