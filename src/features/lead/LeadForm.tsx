import type { FieldConfig, FormValues } from "../../types/form";
import Field from "../../design-system/molecules/Field";
import Button from "../../design-system/atoms/Button";
import FieldControl from "./FieldControl";
import { isVisible } from "./validation";
import { useLeadForm } from "./useLeadForm";
import styles from "./LeadForm.module.css";

type Props = {
  config: FieldConfig[];
  onSubmit: (values: FormValues) => void;
};

export default function LeadForm({ config, onSubmit }: Props) {
  const { values, handleChange, handleBlur, handleSubmit, errorFor } =
    useLeadForm(config, onSubmit);

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.fields}>
        {config.map((field) => {
          if (!isVisible(field, values)) return null;

          const error = errorFor(field.name);
          const cell = field.halfWidth ? styles.half : styles.full;

          return (
            <div key={field.name} className={cell}>
              <Field
                id={`field-${field.name}`}
                label={field.type === "checkbox" ? undefined : field.label}
                hint={field.hint}
                error={error}
              >
                <FieldControl
                  field={field}
                  value={values[field.name]}
                  error={error}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
            </div>
          );
        })}
      </div>

      <div className={styles.actions}>
        <Button type="submit" label="Submit" />
      </div>
    </form>
  );
}
