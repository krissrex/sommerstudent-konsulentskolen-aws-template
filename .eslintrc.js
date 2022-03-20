module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    overrides: [
        { "files": ["lib/**/*.ts", "bin/**/*.ts"] },
    ],
    ignorePatterns: ["**/*.d.ts", "**/*.js", "out/"],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    root: true,
    rules: {},
};
