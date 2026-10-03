import { CssComments } from "./cssComments";
import styles from "./cssRelativePadding.module.scss";

export default function CssRelativePadding() {
  return (
    <div className={styles.box}>
      <h2>relative padding</h2>
      <div className={styles.relativePadding}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ipsum vel
        nemo, sed eaque obcaecati quaerat aut inventore id fuga!
      </div>
      <pre className={styles.code}>
        <code><CssComments commentClassName={styles.comment}>{`.relative-padding {
  padding: min(5em, 8%);   /* 8% of the parent's width, capped at 5em */
}`}</CssComments></code>
      </pre>
    </div>
  );
}
