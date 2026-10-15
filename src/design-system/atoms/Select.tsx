import styles from "./atoms.module.css";

type Props = {
  id: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  hasError?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export default function Select({
  id,
  name,
  value,
  options,
  hasError,
  onChange,
  onBlur,
}: Props) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      aria-invalid={hasError}
      className={`${styles.control} ${hasError ? styles.invalid : ""}`}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    >
      <option value="">Select...</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
