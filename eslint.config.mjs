import nextVitals from "eslint-config-next/core-web-vitals";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
	...tseslint.configs.recommended,
	...nextVitals,
	globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "public/**"]),
]);

export default eslintConfig;
