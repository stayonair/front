module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['plugin:vue/recommended'],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // Prohibit using var
    'no-var': 2,
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_'
      }
    ],

    // Prefer const over let
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }
    ],

    // Don't use variables before defining
    'no-use-before-define': 2,

    // No async function without await
    'require-await': 2,

    // Use dot nation where applicable
    'dot-notation': 2,

    // No single if in an "else" block
    'no-lonely-if': 2,

    // Prohibit using alert
    'no-alert': 2,

    // Force curly braces for control flow
    curly: 2,

    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          minProperties: 3,
          consistent: true
        },
        ObjectPattern: 'never'
      }
    ],
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'layout',
          'head',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'middleware',
          'mixins',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'i18n',
          'fetch',
          'asyncData',
          'data',
          'computed',
          'watch',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError'
        ]
      }
    ]
  }
}
