const fs = require('fs')
const path = require('path')

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'))

module.exports = {
  settings:{
    react:{
      version:'detected'
    }
  },
  env: {
    browser: true,
    es2021: true,
    node:true,
    jest:true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      module: true
    }
  },
  'plugins': [
    'react',
    'prettier',
    'react-hooks',
    'import'
  ],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'react/prop-types': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-key': 'warn',
    semi: [
      'error',
      'never'
    ],
    quotes: [
      'error',
      'single'
    ],
    indent: [
      'error',
      2,
      {
        'SwitchCase': 1
      }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'no-new-object': 'error',
    'no-array-constructor':'error',
    'react/jsx-filename-extension': [
      1,
      {
        'extensions': [
          '.js',
          '.jsx'
        ]
      }
    ]
  }
}