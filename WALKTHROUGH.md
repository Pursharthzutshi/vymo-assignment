# How this project works

This is my own walkthrough of the lead form, written so I can explain it on the call. The short README covers install and folder layout. This file covers how the pieces connect and why I built it this way.

## The big picture

The form is not written field by field. There is one list called the config, and the form loops over it and draws one input per entry. If I want a new field, I add one entry to the config and nothing else changes.

The flow from the top:

`main.tsx` renders `LeadPage`. `LeadPage` gives the config to `LeadForm`. `LeadForm` loops over the config and draws each field. When the user submits, the values go back up to `LeadPage`, which shows them on the page.

## Walking through the code

### main.tsx and LeadPage

`main.tsx` loads the token and global CSS and renders `LeadPage`.

`LeadPage` is the parent. It imports the config (`leadFields`) and passes it to `LeadForm` as a prop, along with an `onSubmit` function. It also keeps one piece of state, `result`. When the form is submitted successfully, `handleSubmit` logs the values and saves them in `result`, and the page shows them in a "Submitted values" box. That is the only job the page has.

### LeadForm

`LeadForm` takes two props, `config` and `onSubmit`. It doesn't hold any state or handlers itself. It calls a hook, `useLeadForm`, which gives back the values, the handlers and a function to get the error for a field. After that, `LeadForm` only draws things.

It loops over the config. For each field it first checks if the field is visible (more on that below), then renders a `Field` with a `FieldControl` inside it. The `Field` draws the label above, then the input, then the hint or the error text below (the hint is hidden while an error is showing). The `FieldControl` draws the actual input. Wrapping one in the other is what puts the label above the input.

Each field is also wrapped in a div that gets the class `half` or `full`, depending on `halfWidth` in the config. The layout CSS uses those two classes, see the CSS section below.

### useLeadForm: the state

The hook keeps three things in state:

- `values`: what the user has typed, as one object, for example `{ fullName: "John", email: "john@gmail.com", ... }`.
- `touched`: which fields the user has already visited and left.
- `submitted`: whether the submit button has been clicked at least once. It starts as `false`.

**Initial values.** The config is a list of objects, so the values should also be one object with a key for each field. `getInitialValues` loops over the config and makes that object. Every field starts as an empty string, except a checkbox, which starts as `false` because it needs a boolean. For this config it comes out as `{ fullName: "", email: "", leadType: "", companyName: "", phone: "", notes: "", consent: false }`.

The key for each entry is `field.name`. I used the name because it is unique, it doesn't change when I reword a label, and it is what ties together the value, the error and the touched flag of one field.

**handleChange.** The input tells us the field name and the new value. I copy the old values, change that one key, and save the new object. Copying keeps what the user already typed in the other fields, and it gives React a new object so it re-renders.

**handleBlur.** It works the same way but on `touched`. When the user leaves a field, that field is marked `true`. Fields the user hasn't visited are not in the object at all. A field stays `true` after that, even once it's valid. That is fine, because `touched` only means "we are allowed to show an error here". Whether there is an error depends on the validation.

**errorFor.** Errors are not stored in state. On every render I call `validate(config, values)` to get all the current errors. Then `errorFor(name)` decides if I should show one: only if that field is touched, or if the form was already submitted.

### FieldControl

This is where the field type is turned into an input. It receives one field from the config plus its value and the handlers. It looks at `field.type` and picks the atom: `text` and `email` give a `TextInput`, `textarea` gives a `Textarea`, `select` gives a `Select`, `checkbox` gives a `Checkbox`.

Two different things come from the same config entry, and they do different jobs:

- `field.type` decides which input is drawn.
- `field.name` decides which value is shown and which key is updated.

Phone is a good example. Its type is `text` and its name is `phone`, so it draws a text input that shows `values.phone`.

The loop in `LeadForm` runs the same code for every field. Only the field changes, so everything adapts to it.

### handleSubmit

When the form is submitted:

1. The default page reload is stopped.
2. `submitted` is set to `true`, so every error shows, even for fields the user never touched.
3. If there is any error, it stops there. The form is blocked.
4. If everything is valid, `getVisibleValues` builds the result using only the fields that are visible, and `onSubmit` sends it to `LeadPage`.

I filter by visibility so a hidden Company name never gets submitted. If someone types a company, then switches back to Individual, the old text is still in state, but it is left out of the result.

## Validation

All the validation lives in the `validation` folder. It is a pure function: the same config and values always give the same errors, and it doesn't touch React or the screen.

- `validation/rules.ts`: one small function per rule. `checkRequired`, `checkEmail`, `checkDigits` and `checkMaxLength`. Each gets a field and a value and returns an error message, or an empty string if it is fine.
- `validation/validate.ts`: `validate` loops over the config, skips hidden fields, and runs the rules for each field. The first rule that fails gives the message for that field. It also has `isVisible`.
- `validation/index.ts`: exports `validate` and `isVisible`, so the rest of the app imports from one place.

**Visibility.** Company name has `visibleWhen: { field: "leadType", equals: "company" }` in the config. `isVisible` checks that against the current values. The form uses it to decide whether to draw the field, and `validate` uses it to skip hidden fields. That is how "required only when visible" works without any special case for Company name.

The atoms don't know any lead rules. They only get a value, a label and events. All the lead-specific logic is in the config and the validation folder.

## The CSS

I used plain CSS modules and no library. In a component I write `styles.control`, and the build turns that into a unique class name, so a `.control` in one file can never clash with a `.control` in another file. The tokens are CSS variables, and everything else uses them with `var(--...)`, so changing a color or a spacing is a one-line change.

**Tokens** (`design-system/tokens/tokens.css`). Variables for color (background, text, border, primary, error), spacing, type, the radius, and the breakpoints. One thing I need to remember: CSS variables don't work inside `@media` rules, so the breakpoint variables are only a reference. The media queries use the plain number. `global.css` only sets `box-sizing: border-box` and the body font, color and background.

**Atoms** (`atoms.module.css`). One shared `.control` class for the text input, textarea and select: full width, padding, border and radius from the tokens. The checkbox and the button have their own small classes. `.checkbox` lines up the box and its text with flex, and `.button` is the blue background with white bold text and a darker blue on hover. Nothing special there.

**Blue ring versus red border.** These are two different things.

- The blue ring is `.control:focus`. It is pure CSS. The browser applies it while the cursor is in the field.
- The red border is the `.invalid` class. CSS doesn't decide when it applies. React does. In each atom the class name is `hasError ? styles.invalid : ""`. `hasError` is true when the field has a visible error (touched or submitted, and the validation found a problem). When the user fixes the value, the error goes away, the class is removed, and the border goes back to normal.

**Field** (`Field.module.css`). A flex column: label, control, then the hint or the error, with a small gap. The CSS has no condition here either. In `Field.tsx` the error paragraph is only rendered when there is an error message, so whenever it exists it is red (`.error` uses `--color-error`). It doesn't depend on the field being empty. The message exists when the validation found a problem and the field is touched or the form was submitted. The error text also has `overflow-wrap: anywhere` so a long message wraps and never pushes the page sideways, and the field has `min-width: 0` so it can shrink inside a flex row without overflowing.

**Layout** (`LeadForm.module.css`). I used flexbox, not grid. The assignment only asks for two columns on desktop and one on mobile, so flex is enough.

- `.fields` is the flex container around all the fields. It has `flex-wrap: wrap`, so when a field doesn't fit in the current row it drops to the next row instead of getting squashed or overflowing. The gap between fields comes from the tokens.
- `.half` and `.full` are the two classes `LeadForm` puts on the div around each field. It picks `half` when the config entry has `halfWidth: true`, and `full` otherwise. In the config, Full name, Email, Lead type, Company name and Phone are half. Notes and Consent are full.
- By default (mobile and tablet) both `.half` and `.full` are `width: 100%`, so every field takes a whole row. That is the one column layout with full-width inputs.
- Over 1024px, the media query changes `.half` to `calc((100% - gap) / 2)`, which is the full width minus one gap, divided by two. That fits exactly two per row. `.full` stays at 100%, which is why Notes and Consent span the whole width. The media query also makes the gap between columns a bit bigger.
- Which fields share a row depends on whether Company name is showing. A hidden field isn't rendered, so the others just move up. With Individual, Lead type and Phone sit next to each other. With Company, Lead type and Company name are on one row and Phone is alone on the next.
- The submit bar (`.actions`) uses `position: sticky; bottom: 0` on mobile and tablet, so it stays at the bottom of the screen while the form scrolls. It is full width with a top border, and a negative margin cancels the card's padding so it goes edge to edge. On desktop the media query makes it a normal element, aligned to the right under the form.

Tablet follows the mobile layout, as the brief allows. There is one breakpoint, 1025px, used in `LeadForm.module.css` and `LeadPage.module.css`.

**Page** (`LeadPage.module.css`). A centered card with a max width of 760px, a little padding on small screens and more on desktop (it has its own media query at the same 1025px), plus the styling for the submitted values box.

## Decisions I'd mention on the call

- **Config-driven.** Adding a field is one config entry. The form, the validation and the inputs all read from it.
- **Atoms stay generic.** They get a value, a label and events. They don't know what a lead is.
- **`FieldControl` maps type to atom.** I kept it as a switch because there are only five types and TypeScript checks that I handled all of them.
- **Validation is a pure function.** The rules are small separate functions, so adding a rule means adding one function and one line in the list.
- **Form logic is in a hook.** `useLeadForm` holds the state and handlers so `LeadForm` is only about drawing.
- **Errors are computed, not stored.** I calculate them on every render from the config and values, so they can never get out of sync with what is on the screen.
- **Hidden fields are skipped.** They are not validated and not submitted.
- **Flexbox over grid.** The brief only needs two columns and one column.
- **Types in their own folder.** Shared types live in `src/types/form.ts`.
- **One extra atom.** I added `Textarea`, because the textarea field type needs an input, even though the brief only lists text input, select, checkbox and button.

## Adding a new field

1. Open `src/features/lead/config.ts`.
2. Add an entry with a unique `name`, a `type`, a `label`, and any rules (`required`, `digits`, `maxLength`, `visibleWhen`).
3. That's it. The initial value, the input, the error handling and the submit all pick it up.

A new type of input (for example a radio) would also need a new atom and one new case in `FieldControl`. The brief says not to go past the five controls, so I left it out.
