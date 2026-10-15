import type { FieldConfig, FieldValue } from "../../types/form";
import TextInput from "../../design-system/atoms/TextInput";
import Textarea from "../../design-system/atoms/Textarea";
import Select from "../../design-system/atoms/Select";
import Checkbox from "../../design-system/atoms/Checkbox";

type Props = {
  field: FieldConfig;
  value: FieldValue;
  error?: string;
  onChange: (name: string, value: FieldValue) => void;
  onBlur: (name: string) => void;
};

export default function FieldControl({
  field,
  value,
  error,
  onChange,
  onBlur,
}: Props) {
  const text = typeof value === "string" ? value : "";
  const handleChange = (newValue: FieldValue) => onChange(field.name, newValue);
  const handleBlur = () => onBlur(field.name);

  const common = {
    id: `field-${field.name}`,
    name: field.name,
    hasError: !!error,
    onBlur: handleBlur,
  };

  switch (field.type) {
    case "text":
    case "email":
      return (
        <TextInput
          {...common}
          type={field.type}
          value={text}
          placeholder={field.placeholder}
          onChange={handleChange}
        />
      );
    case "textarea":
      return (
        <Textarea
          {...common}
          value={text}
          placeholder={field.placeholder}
          onChange={handleChange}
        />
      );
    case "select":
      return (
        <Select
          {...common}
          value={text}
          options={field.options ?? []}
          onChange={handleChange}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          id={common.id}
          name={field.name}
          label={field.label}
          checked={value === true}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      );
  }
}
