import { useState } from "react";
import type { FormEvent } from "react";
import type { FieldConfig, FieldValue, FormValues } from "../../types/form";
import { getInitialValues, getVisibleValues } from "./formValues";
import { validate } from "./validation";

export function useLeadForm(
  config: FieldConfig[],
  onSubmit: (values: FormValues) => void
) {
  const [values, setValues] = useState<FormValues>(() =>
    getInitialValues(config)
  );
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(config, values);

  function handleChange(name: string, value: FieldValue) {
    const newValues = { ...values };
    newValues[name] = value;
    setValues(newValues);
  }

  function handleBlur(name: string) {
    const newTouched = { ...touched };
    newTouched[name] = true;
    setTouched(newTouched);
  }

  function errorFor(name: string) {
    return touched[name] || submitted ? errors[name] : undefined;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);

    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) return;

    onSubmit(getVisibleValues(config, values));
  }

  return { values, handleChange, handleBlur, handleSubmit, errorFor };
}
