import type { FieldConfig, FormValues } from "../../types/form";
import { isVisible } from "./validation";

export function getInitialValues(config: FieldConfig[]): FormValues {
  const values: FormValues = {};

  for (const field of config) {
    if (field.type === "checkbox") {
      values[field.name] = false;
    } else {
      values[field.name] = "";
    }
  }

  return values;
}

export function getVisibleValues(
  config: FieldConfig[],
  values: FormValues
): FormValues {
  const result: FormValues = {};

  for (const field of config) {
    if (isVisible(field, values)) {
      result[field.name] = values[field.name];
    }
  }

  return result;
}
