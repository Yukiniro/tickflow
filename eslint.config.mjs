import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// ESLint 10 + eslint-config-next 16：使用原生 flat config，不再依赖 @eslint/eslintrc 的 FlatCompat
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // 由原 .eslintignore 迁移而来
    ignores: ["**/*.json"],
  },
];

export default eslintConfig;
