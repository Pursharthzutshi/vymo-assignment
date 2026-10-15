import type { FieldConfig, FieldValue } from "../../../types/form";

export type Rule = (field: FieldConfig, value: FieldValue) => string;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toText(value: FieldValue): string {
  return typeof value === "string" ? value.trim() : "";
}

const checkRequired: Rule = (field, value) => {
  if (!field.required) return "";

  if (field.type === "checkbox") {
    return value === true ? "" : "This box must be ticked";
  }

  return toText(value) === "" ? `${field.label} is required` : "";
};

const checkEmail: Rule = (field, value) => {
  const text = toText(value);
  if (field.type !== "email" || text === "") return "";

  return emailPattern.test(text) ? "" : "Enter a valid email address";
};

const checkDigits: Rule = (field, value) => {
  const text = toText(value);
  if (!field.digits || text === "") return "";

  const pattern = new RegExp(`^\\d{${field.digits}}$`);
  return pattern.test(text) ? "" : `Enter exactly ${field.digits} digits`;
};

const checkMaxLength: Rule = (field, value) => {
  const text = toText(value);
  if (!field.maxLength || text === "") return "";

  return text.length <= field.maxLength
    ? ""
    : `Maximum ${field.maxLength} characters`;
};

export const rules: Rule[] = [
  checkRequired,
  checkEmail,
  checkDigits,
  checkMaxLength,
];
