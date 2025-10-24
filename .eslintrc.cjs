module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  settings: { react: { version: 'detect' } },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.*', 'tests/**'],
      globals: {
        vi: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    {
      files: ['e2e/**/*.{js,ts}'],
      extends: ['plugin:playwright/recommended'],
      plugins: ['playwright'],
      rules: { 'playwright/no-conditional-in-test': 'off' },
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
  ],
  ignorePatterns: ['dist/', 'node_modules/', 'playwright-report/'],
}
