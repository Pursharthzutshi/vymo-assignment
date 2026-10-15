import type { ReactNode } from "react";
import styles from "./Field.module.css";

type Props = {
  id: string;
  label?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
};

export default function Field({ id, label, hint, error, children }: Props) {
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      {children}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
