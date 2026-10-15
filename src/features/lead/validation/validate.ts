import type { FieldConfig, FormErrors, FormValues } from "../../../types/form";
import { rules } from "./rules";

export function isVisible(field: FieldConfig, values: FormValues): boolean {
  if (!field.visibleWhen) return true;
  return values[field.visibleWhen.field] === field.visibleWhen.equals;
}

function validateField(field: FieldConfig, values: FormValues): string {
  const value = values[field.name];

  for (const rule of rules) {
    const message = rule(field, value);
    if (message) return message;
  }

  return "";
}

export function validate(
  config: FieldConfig[],
  values: FormValues
): FormErrors {
  const errors: FormErrors = {};

  for (const field of config) {
    if (!isVisible(field, values)) continue;
    const message = validateField(field, values);
    if (message) errors[field.name] = message;
  }

  return errors;
}
