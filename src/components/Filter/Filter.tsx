import styles from './filter.module.scss';

export default function Filter(): JSX.Element {
  return (
    <form className={styles.filter}>
      <input
        className={styles.filter_input}
        id="activeNotes"
        type="radio"
        name="notesFilter"
        value="active"
        defaultChecked
      />
      <label className={styles.filter_label} htmlFor="activeNotes">
        Active
      </label>

      <input
        className={styles.filter_input}
        id="archivedNotes"
        type="radio"
        name="notesFilter"
        value="archived"
      />
      <label className={styles.filter_label} htmlFor="archivedNotes">
        Archived
      </label>
    </form>
  );
}
