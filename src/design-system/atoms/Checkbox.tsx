import styles from "./atoms.module.css";

type Props = {
  id: string;
  name: string;
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
};

export default function Checkbox({
  id,
  name,
  checked,
  label,
  onChange,
  onBlur,
}: Props) {
  return (
    <label htmlFor={id} className={styles.checkbox}>
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        onBlur={onBlur}
      />
      <span>{label}</span>
    </label>
  );
}
