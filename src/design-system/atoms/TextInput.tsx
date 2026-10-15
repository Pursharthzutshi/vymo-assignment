import styles from "./atoms.module.css";

type Props = {
  id: string;
  name: string;
  value: string;
  type?: "text" | "email";
  placeholder?: string;
  hasError?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export default function TextInput({
  id,
  name,
  value,
  type = "text",
  placeholder,
  hasError,
  onChange,
  onBlur,
}: Props) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      aria-invalid={hasError}
      className={`${styles.control} ${hasError ? styles.invalid : ""}`}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
  );
}
