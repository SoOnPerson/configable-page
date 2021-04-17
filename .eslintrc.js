/*
 * @Author: SoOnPerson
 * @Date: 2021-04-17 11:43:10
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-17 13:08:36
 * @Descripttion: esLint的配置
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ["eslint:recommended", "plugin:vue/essential"],
  rules: {
    "array-bracket-newline": [
      2,
      "consistent"
    ],
    "comma-dangle": [
      2,
      "only-multiline"
    ],
    "generator-star-spacing": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-parsing-error": [
      2,
      {
        "unexpected-solidus-in-tag": false,
      },
    ],
    "prettier/prettier": "off", // 这一句是为了解决一个bug
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 7,
    sourceType: "module",
    ecmaFeatures: {
      // 添加ES特性支持，使之能够识别ES6语法
      jsx: true,
    },
  },
};