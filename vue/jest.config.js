module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
 },
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.(ts|js)$': 'ts-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@ionic/core|@stencil/core|ionicons)'
  ],
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(ts)$',
  moduleFileExtensions: ['vue', 'js', 'ts'],
  "moduleNameMapper": {
    "@/(.*)": "<rootDir>/src/$1"
  },
}