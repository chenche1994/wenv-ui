module.exports = {
  root: true,

  env: {
    node: true,
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'import/extensions': [
      'error',
      'always',
      {
        ignorePackages: true,
      },
    ],
    'vue/max-attributes-per-line': 'off',
    'max-len': [
      'error',
      {
        code: 120,
      },
    ],
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea', 'span', 'a'],
      },
    ],
    'vue/no-v-html': 'off',
    'vue/component-name-in-template-casing': 'off',
    'arrow-parens': ['error', 'always'],
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  extends: ['plugin:vue/recommended', '@vue/airbnb'],
};
