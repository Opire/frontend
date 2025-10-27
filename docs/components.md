# Components

## Overview

Defines deterministic UI rules for the frontend.
The system is built on Mantine with CSS Modules and app-specific wrappers prefixed with Opire.

| Layer   | Library                            | Notes                        |
| ------- | ---------------------------------- | ---------------------------- |
| Base UI | `Mantine` (`@mantine/*`)           | Core UI library              |
| Icons   | `@tabler/icons-react`              | Default icon set             |
| Styling | CSS Modules + Mantine theme tokens | Deterministic styling system |

## Rules

### 1. Naming

- Prefix all reusable wrappers with Opire (e.g. OpireButton, OpireSelect).

### 2. Wrappers

- Create wrappers only when style or behavior diverges from Mantine.
- Keep Mantine API unchanged unless extending features.

### 3. Placement

- Store global reusable components in app/\_components/.
- Store feature/page-specific components in app/**/**/\_components/.
- Avoid duplicating existing wrappers. If a component already exists in other folders, move it to the nearest common ancestor, update the imports and use it from there.

### 4. Styling

- Use CSS Modules and Mantine theme tokens for all styles.
- Use sx prop only for dynamic or theme-based styles.
- Never use inline style, global selectors, or third-party style systems (Tailwind, etc.).
- Use Mantine theme variables for spacing, colors, typography...
- Global theming may be configured through MantineProvider.

### 5. Component Type

- Use Server Components by default.
- Add "use client" only when interactivity or React hooks are required.

### 6. Composition

- Combine existing wrappers before creating new primitives.
- Wrap external libraries (e.g. charts, maps) using the same Opire\* pattern.
- Keep prop names consistent with Mantine’s API.

## Example

- `app/_components/OpireButton.tsx`:

```tsx
import { Button, type ButtonProps } from '@mantine/core';
import classes from './OpireButton.module.css';

export function OpireButton(props: ButtonProps) {
  return <Button className={classes.root} {...props} />;
}
```

- `app/_components/OpireButton.module.css`:

```css
.root {
  border-radius: var(--mantine-radius-md);
  font-weight: 500;
}
```

### Correct

```tsx
<Button sx={theme => ({ padding: theme.spacing.md })}>Save</Button>
```

### Incorrect

```tsx
<Button sx={{ color: 'red', fontSize: '20px' }}>Wrong</Button>
```

## Related Docs

| Topic          | Path                  |
| -------------- | --------------------- |
| Code Standards | `./code-standards.md` |
