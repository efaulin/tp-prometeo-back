/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [
    '<rootDir>/dist/', // Ignora la carpeta dist
    '<rootDir>/node_modules/' // También puedes ignorar node_modules si no lo has hecho
  ],
  setupFiles: ['<rootDir>/dotenv.setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  verbose: true,
  moduleFileExtensions: ['ts', 'js', 'json', 'jsx', 'tsx'],
};