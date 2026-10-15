# Lead capture form

A config-driven lead form built with React + TypeScript and plain CSS (CSS modules). No component library.

## Install and run

```
npm install
npm run dev
```

Build for production with `npm run build`.

## Folder layout

```
src/
  types/                 shared TypeScript types (form.ts)
  design-system/
    tokens/              tokens.css (color, spacing, type, breakpoints), global.css
    atoms/               TextInput, Textarea, Select, Checkbox, Button
    molecules/           Field (label + control + hint + error)
  features/lead/
    config.ts            the field config
    validation/
      index.ts           exports validate() and isVisible()
      validate.ts        validate() runs the rules on every visible field, plus isVisible()
      rules.ts           one small function per validation rule
    formValues.ts        initial values and the values sent on submit
    useLeadForm.ts       form state and handlers (change, blur, submit)
    LeadForm.tsx         renders one field per config entry
    FieldControl.tsx     maps a field type to an atom
    LeadForm.module.css  desktop and mobile layout
    LeadPage.tsx         the page
    LeadPage.module.css  page and card spacing
```

## Where things live

- **Tokens:** `src/design-system/tokens/tokens.css`
- **Atoms:** `src/design-system/atoms/`
- **Field molecule:** `src/design-system/molecules/Field.tsx`
- **Form state and handlers:** `src/features/lead/useLeadForm.ts`
- **The form:** `src/features/lead/LeadForm.tsx`
- **Type to atom mapping:** `src/features/lead/FieldControl.tsx`
- **Config:** `src/features/lead/config.ts` (to add a field, add an entry)
- **Validation rules:** `src/features/lead/validation/` (`rules.ts` has one function per rule, `validate.ts` runs them as a pure function of config and values)

## Layout

- `src/features/lead/LeadForm.module.css` owns the form layout: one column by default (mobile and tablet), two columns over 1024px. Fields marked `halfWidth` in the config get the `.half` class (two per row on desktop), the rest get `.full`.
- `src/features/lead/LeadPage.module.css` owns the page and card spacing.

## More detail

See `WALKTHROUGH.md` for how the form, the validation and the CSS work together.
