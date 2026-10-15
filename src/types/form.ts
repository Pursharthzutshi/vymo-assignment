export type FieldType = "text" | "email" | "select" | "textarea" | "checkbox";

export type Option = {
  value: string;
  label: string;
};

export type VisibleWhen = {
  field: string;
  equals: string;
};

export type FieldConfig = {
  name: string;
  type: FieldType;
  label: string;
  hint?: string;
  placeholder?: string;
  options?: Option[];
  halfWidth?: boolean;
  visibleWhen?: VisibleWhen;
  required?: boolean;
  digits?: number;
  maxLength?: number;
};

export type FieldValue = string | boolean;

export type FormValues = Record<string, FieldValue>;

export type FormErrors = Record<string, string>;
