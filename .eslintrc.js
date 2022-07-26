module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'import/no-unresolved': 'off',
      'no-plusplus': 'off',
      'no-shadow': 'off',
    }
}
