import styles from "./atoms.module.css";

type Props = {
  label: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export default function Button({ label, type = "button", onClick }: Props) {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
}
