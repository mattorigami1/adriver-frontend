module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest": true,
    },
    "globals": {
        "window": true,
        "define": true,
        "require": true,
        "module": true,
        "process": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
            "es6": true,
        },
        "sourceType": "module"
    },
    "plugins": [
        "babel",
        "react"
    ],
    "ignorePatterns": ["temp.js", "node_modules/"],
    "rules": {
        "no-console": "error",               /* Not allowed console logs */
        "no-unused-vars": "error",           /* Not allowed unused variable*/
        "no-var": "error",                   /* Not allowd var used let or const instead of var */ 
        "camelcase": ["error", {"properties": "always"}], /* Allow only camel case variables and function */
        "no-eval": "error",                  /* Not allowed use of eval */
        "indent": ["error", 2],              /* Restrict the indentation to 4 spcaes */
        "linebreak-style": [ "error", "unix" ],
        "quotes": [ "error", "single" ],     /* Allow only single quotes in imports */
        "semi": [ "error", "always"],        /* Restrict samicolon at the end of statement */
        "react/jsx-boolean-value": 0,        /* Enforce boolean attributes notation in JSX  */
        "react/jsx-closing-bracket-location": 1, /* Validate closing bracket location in JSX */
        "react/jsx-indent-props": [1, 2],     /* Validate JSX indentation (fixable) */ 
        "react/jsx-no-undef": 1,             /* Disallow undeclared variables in JSX */
        "react/jsx-uses-react": 1,           /* Prevent React to be incorrectly marked as unused */
        "react/jsx-uses-vars": 1,            /* Prevent variables used in JSX to be incorrectly marked as unused */
        "react/jsx-pascal-case": 1,          /*  Enforce PascalCase for user-defined JSX components */
    }
};
