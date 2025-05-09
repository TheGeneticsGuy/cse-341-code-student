// .eslintrc.js
module.exports = {
    env: {
        commonjs: true,
        es2021: true,   // Or your preferred ECMAScript version (e.g., es2020, es2022, 'latest')
        node: true,     // Crucial: Defines Node.js global variables and Node.js scoping.
    },
    extends: [
        'eslint:recommended',
        'prettier',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {

    },
};