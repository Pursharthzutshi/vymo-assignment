import styles from "./atoms.module.css";

type Props = {
  id: string;
  name: string;
  value: string;
  placeholder?: string;
  hasError?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export default function Textarea({
  id,
  name,
  value,
  placeholder,
  hasError,
  onChange,
  onBlur,
}: Props) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      rows={4}
      placeholder={placeholder}
      aria-invalid={hasError}
      className={`${styles.control} ${hasError ? styles.invalid : ""}`}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
  );
}
