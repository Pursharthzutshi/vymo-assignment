import type { FieldConfig } from "../../types/form";

export const leadFields: FieldConfig[] = [
  {
    name: "fullName",
    type: "text",
    label: "Full name",
    placeholder: "Jane Doe",
    halfWidth: true,
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "jane@example.com",
    halfWidth: true,
    required: true,
  },
  {
    name: "leadType",
    type: "select",
    label: "Lead type",
    halfWidth: true,
    required: true,
    options: [
      { value: "individual", label: "Individual" },
      { value: "company", label: "Company" },
    ],
  },
  {
    name: "companyName",
    type: "text",
    label: "Company name",
    halfWidth: true,
    visibleWhen: { field: "leadType", equals: "company" },
    required: true,
  },
  {
    name: "phone",
    type: "text",
    label: "Phone",
    hint: "10 digits, numbers only",
    halfWidth: true,
    required: true,
    digits: 10,
  },
  {
    name: "notes",
    type: "textarea",
    label: "Notes",
    hint: "Optional, up to 200 characters",
    maxLength: 200,
  },
  {
    name: "consent",
    type: "checkbox",
    label: "I agree to be contacted about my enquiry",
    required: true,
  },
];
