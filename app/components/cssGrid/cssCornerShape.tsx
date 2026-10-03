import { CssComments } from "./cssComments";
import styles from "./cssCornerShape.module.scss";

export default function CssCornerShape() {
  return (
    <div className={styles.box}>
      <h2>corner shape</h2>
      <div className={styles.shape}></div>
      <pre className={styles.code}>
        <code><CssComments commentClassName={styles.comment}>{`.shape {
  border-radius: 50px;                   /* sets the size of each corner */
  corner-shape: superellipse(5) notch;   /* sets its shape; 2 values alternate */
  transition: all 400ms;                 /* corner shapes can animate */

  &:hover {
    corner-shape: notch superellipse(5); /* swap them on hover */
  }
}
/* other shapes: round, squircle, bevel, scoop, square */
/* Chromium only for now; elsewhere it falls back to plain rounded corners */`}</CssComments></code>
      </pre>
    </div>
  );
}
