module.exports = {
    "parser": "babel-eslint",
    "extends": "eslint:recommended",
    "env": {
        "browser": true,
        "node": true,
        "jquery": true
    },
    "rules": {
        // enable additional rules
        "indent": ["error", "tab", {"SwitchCase": 1}],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],

        // override default options for rules from base configurations
        "comma-dangle": ["error", "never"],
        "no-cond-assign": ["error", "always"],

        // disable rules from base configurations
        "no-console": "off",
        "no-unused-vars": ["error", {
            "args": "none"
        }]
    }
}
