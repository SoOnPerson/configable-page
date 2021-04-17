/*
 * @Author: SoOnPerson
 * @Date: 2021-04-17 11:46:38
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-17 11:47:20
 * @Descripttion: styleLint的配置
 */
module.exports = {
  extends: "stylelint-config-standard",
  rules: {
    "color-no-invalid-hex": true,
    "rule-empty-line-before": null,
    "color-hex-length": "long",
    "color-hex-case": "lower",
    "unit-whitelist": ["em", "rem", "%", "s", "px"],
    "declaration-colon-newline-after": null,
  },
};