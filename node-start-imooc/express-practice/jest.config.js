module.exports = {
  collectCoverage: true,
  coverageDirectory: './coverage',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  roots: ['<rootDir>/src'],
  timers: 'fake',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Setup Enzyme
  'snapshotSerializers': ['enzyme-to-json/serializer'],
  'setupFilesAfterEnv': [
    '<rootDir>/src/setupEnzyme.ts',
  ]
}