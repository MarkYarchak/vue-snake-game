module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // "function-paren-newline": ["error", "multiline-arguments"],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "no-use-before-define": ["error", { "functions": false, "classes": false }],
    "@typescript-eslint/no-use-before-define": ["error", { "functions": false, "classes": false }],
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "never",
      "exports": "never",
      "functions": "never"
    }],
    semi: ["error", "always"],
    'space-before-function-paren': ["error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always"
    }],

    curly: "off",
    'import/no-unresolved': [
      0,
      {
        commonjs: true,
        amd: true,
      },
    ],
    "no-unused-vars": [
      "error",
      {
        "vars": "all",
        "args": "after-used",
        "ignoreRestSiblings": false,
      },
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow:
          [
            '_id',
            '_key',
            '_isVue',
            '__get',
            '__typename',
          ],
      },
    ],
    'vue/attribute-hyphenation': [
      'error',
      'always',
    ],
    'vue/html-end-tags': 'error',
    "vue/html-indent": ['error', 2, {
      "attribute": 1,
      "baseIndent": 1,
      "closeBracket": 0,
      "alignAttributesVertically": true,
    }],
    // 'vue/html-self-closing': ['error', {
    //   "html": {
    //     "void": "always",
    //     "normal": "never",
    //     "component": "always"
    //   },
    //   "svg": "always",
    //   "math": "always",
    // }],
    'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'vue/attributes-order': 'error',
    'vue/html-quotes': [
      'error',
      'double',
    ],
    'vue/order-in-components': 'error',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
