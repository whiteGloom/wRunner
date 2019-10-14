module.exports = {
    "parser": "babel-eslint",
    "extends": "eslint:recommended",
    "env": {
        "browser": true,
        "node": true,
        "jquery": true,
        "jasmine": true
    },
    "rules": {
        "indent": ["error", "tab", {"SwitchCase": 1}],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "comma-dangle": ["error", "never"],
        "no-cond-assign": ["error", "always"],
        "no-console": "off",
        "no-unused-vars": ["error", {
            "args": "none"
        }],
        "space-before-blocks": ["error", "always"],
        "arrow-spacing": ["error", { "before": true, "after": true }],
        "spaced-comment": ["error", "always"]
    }
}
