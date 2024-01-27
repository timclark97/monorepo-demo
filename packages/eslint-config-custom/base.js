const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:deprecation/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier",
    "eslint-config-turbo"
  ],
  plugins: ["import", "@typescript-eslint"],
  ignorePatterns: ["node_modules/", "dist/", "build/"],
  parserOptions: {
    project,
    tsconfigRootDir: __dirname
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {
        project
      }
    }
  },
  root: true,
  rules: {
    "require-await": "off",
    "no-unreachable": "error",
    eqeqeq: ["error", "smart"],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          arguments: false,
          attributes: false
        }
      }
    ],
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/require-await": "off",
    "import/no-deprecated": "error",
    "import/no-useless-path-segments": "error",
    "import/consistent-type-specifier-style": "error",
    "import/exports-last": "error",
    "import/newline-after-import": "error",
    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "external"],
          "internal",
          ["parent", "sibling"],
          "index"
        ],
        "newlines-between": "always"
      }
    ]
  }
};
