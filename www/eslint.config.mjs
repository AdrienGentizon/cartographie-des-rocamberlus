import nextVitals from "eslint-config-next/core-web-vitals";
import { defineConfig } from "eslint/config";

import baseConfig from "../eslint.config.mjs";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...baseConfig,
  {
    settings: {
      react: { version: "19" },
    },
    rules: {
      "react-hooks/exhaustive-deps": "error",
    },
  },
]);

export default eslintConfig;
