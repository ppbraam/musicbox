module.exports = {
    "parser": "@typescript-eslint/parser",
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["airbnb", "plugin:@typescript-eslint/recommended"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "react",
        "react-hooks",
        "@typescript-eslint"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx", ".ts", ".tsx"]}],
        "import/prefer-default-export": "warn",
        "jsx-a11y/label-has-for": "off",
        "jsx-a11y/label-has-associated-control": "off",
        "jsx-a11y/media-has-caption": ["warn"],
        "max-len": ["warn", {"code": 140}],
        "@typescript-eslint/indent": ["error", 2],
        "react/prop-types": "off",
        "react/button-has-type": "off",
        "arrow-parens": "off",
        "no-unused-vars": "error",
    },
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    },
};
