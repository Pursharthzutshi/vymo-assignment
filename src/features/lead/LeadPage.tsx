import { useState } from "react";
import type { FormValues } from "../../types/form";
import { leadFields } from "./config";
import LeadForm from "./LeadForm";
import styles from "./LeadPage.module.css";

export default function LeadPage() {
  const [result, setResult] = useState<FormValues | null>(null);

  function handleSubmit(values: FormValues) {
    console.log("Lead submitted:", values);
    setResult(values);
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Get In Touch</h1>
        <LeadForm config={leadFields} onSubmit={handleSubmit} />

        {result && (
          <section className={styles.result}>
            <h2>Submitted values</h2>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </section>
        )}
      </div>
    </main>
  );
}
