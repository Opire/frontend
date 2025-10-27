# Code Standards

These rules define how all code in this repo must be written.
They are designed to be easy for LLMs and humans to follow and ensure consistent, clean, and type-safe TypeScript.

## Core Rules

1. No any.
   Always use explicit, specific types.

2. Small, independent files with single responsibility.
   Each file must have only one thing: component, hook, class... And must have one clear purpose

3. File names match exports.
   Components or classes use UpperCamelCase file names.
   Hooks or utilities use camelCase file names.

4. No default exports.
   Always export by name.

5. Prefer named functions.
   Use named functions instead of arrow functions when possible.

6. Prefer interfaces over types.
   For public contracts or shared data shapes, use interface.

7. Keep style consistent.
   Follow ESLint and Prettier rules already configured in the repo.

8. Avoid comments.
   Add them only when the code cannot explain itself.

9. Use descriptive names.
   Names of variables, functions, classes, interfaces, and files must clearly express intent.

## LLM Guidance

- Follow all Core Rules and Validation Checklist strictly when generating or editing code.
- Prefer self-describing code over comments or explanations.
- Validate with TypeScript, ESLint, and Prettier before assuming correctness.
- Deviations from these rules must be explicitly justified in a comment explaining why.
