import styles from "./loading.module.css";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
}
