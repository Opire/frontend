# Plan de mejora: ESLint + Prettier + TypeScript

Este plan alinea la configuración con las guías del repo y corrige problemas que impiden un lint/format estable.
Referencia principal: docs/code-standards.md (Regla 7: “Keep style consistent. Follow ESLint and Prettier rules”).

## Diagnóstico (con evidencias)

- El archivo de configuración de ESLint está en TypeScript y extensión `.mts`, lo que hace que `next lint`/ESLint 9 no lo cargue de forma nativa.
  - Evidencia: eslint.config.mts:1 importa módulos ESM como si fuera JS, pero el fichero es TS.
  - Ruta: `eslint.config.mts:1`-`eslint.config.mts:3`.
- Prettier no está declarado como devDependency, pero se usa en scripts.
  - Evidencia: `package.json:11` y `package.json:12` usan `prettier`, sin entrada en `devDependencies`.
  - Ruta: `package.json:11`, `package.json:12`, `package.json:42`-`package.json:58`.
- Falta `.prettierignore`, por lo que `prettier --check .` puede escanear artefactos de build (por ejemplo `.next/`).
- La configuración TS no es la recomendada para Next 16 y puede afectar a la resolución en reglas de importación.
  - Evidencia: `"module": "commonjs"`, `"moduleResolution": "node"`.
  - Ruta: `tsconfig.json:15`-`tsconfig.json:16`.
- El set de reglas usa `plugin:import/recommended` pero no configura un resolver para TypeScript.
  - Efecto: falsos positivos de `import/no-unresolved`/orden si aparecen paths TS o condiciones ESM.
- Prettier está integrado de dos formas a la vez: como regla de ESLint (`plugin:prettier/recommended`) y como paso separado en scripts (`prettier --check`).
  - Efecto: trabajo duplicado y ruido en CI. Conviene elegir un único punto de verdad.

## Plan de acción

1. Hacer que ESLint cargue la config de forma fiable
   - Renombrar `eslint.config.mts` a `eslint.config.mjs` (contenido actual ya es JS ESM válido).
   - Alternativa: `eslint.config.js` (con `type: module` en `package.json`) si se prefiere.

2. Asegurar Prettier explícito y versión estable
   - Añadir `prettier` a `devDependencies` (v3):
     - `npm i -D prettier@^3`

3. Ignorar artefactos de build/formato
   - Crear `.prettierignore` con, al menos:
     - `.next/\nnode_modules/\nout/\nbuild/\ndist/\ncoverage/\n`.

4. Resolver imports TS correctamente
   - Añadir `eslint-import-resolver-typescript` y configurar el resolver en ESLint:
     - `npm i -D eslint-import-resolver-typescript`
     - En ESLint (flat config), añadir:
       ```js
       settings: {
         'import/resolver': {
           typescript: { project: ['./tsconfig.json'] },
           node: true,
         },
       }
       ```

5. Elegir una única estrategia para Prettier
   - Opción A (separado — recomendado por Prettier):
     - Quitar `plugin:prettier/recommended` del `extends` y dejar solo `prettier` (vía compat), mantener scripts `format:*` como fuente de verdad.
     - Desinstalar `eslint-plugin-prettier` si no se usa en otros flujos.
   - Opción B (integrado en ESLint):
     - Conservar `plugin:prettier/recommended` y opcionalmente eliminar `format:check` del CI para no duplicar.

6. Ajustar tsconfig a Next 16 para tooling coherente
   - Cambios sugeridos en `tsconfig.json`:
     - `"module": "esnext"`
     - `"moduleResolution": "bundler"`
     - `"jsx": "preserve"` (Next/SWC se encarga del JSX)
   - Justificación: mejora la resolución y alinea el entorno con bundling ESM de Next.

7. Afinar reglas y alcance
   - Limitar `unused-imports/*` y reglas TS a `**/*.{ts,tsx}` si es necesario, para no afectar a JSON o JS de tooling.
   - Mantener `import/order` y, si aparecen alias en el futuro, añadir `pathGroups` para ubicar alias de forma determinista.

8. Validación local y en CI
   - Local:
     - `npm run lint:check`
     - `npm run format:check`
   - CI: fallar en warnings de ESLint si se desea estrictitud: `next lint --max-warnings=0`.

## Cambios propuestos (con referencias)

- Renombrar config: `eslint.config.mts` → `eslint.config.mjs`.
  - Prueba actual: `eslint.config.mts:1`-`eslint.config.mts:3`.
- Añadir Prettier explícito: `package.json:11`-`package.json:12` lo usan; no está en `devDependencies`.
- tsconfig a ESM/bundler: `tsconfig.json:15`-`tsconfig.json:16`.

## Borrador de ESLint (si se quiere dejar 100% flat y sin compat)

Nota: no es obligatorio ahora — el renombrado de archivo ya soluciona la carga. Si se desea, este sería un esquema orientativo sin `FlatCompat` y sin `eslint-plugin-prettier` (Opción A):

```js
// eslint.config.mjs
import js from '@eslint/js';
import next from 'eslint-config-next';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...next(['core-web-vitals', 'typescript']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { import: importPlugin },
    settings: {
      'import/resolver': { typescript: { project: ['./tsconfig.json'] }, node: true },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: false,
        },
      ],
      'import/order': [
        'warn',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
        },
      ],
    },
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
];
```

## Preguntas abiertas (para confirmar)

- ¿Preferimos “Prettier separado” (Opción A) o “Prettier integrado en ESLint” (Opción B)? Opcion A
- ¿Alineamos `tsconfig.json` a ESM/bundler (impacta solo en tooling, no en runtime) tal como sugiere Next 16? Si
- ¿Queremos hacer que el CI falle con cualquier warning (`--max-warnings=0`) o mantener warnings permisivos? Dejamos el max wranings a 5 en CI por ahora.

Si se aprueban los puntos 1–6, procedo a aplicar los cambios y verificar `npm run lint:check` y `npm run format:check` localmente.
