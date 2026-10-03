import BrainsContainer from "../BrainsContainer";
import { CssComments } from "./cssComments";
import styles from "./cssCounterHeadings.module.scss";

const headings = ["counter heading", "another heading", "and another", "last header"];

export default function CssCounterHeadings() {
  return (
    <div className={styles.box}>
      <h2>CSS-only  headings counter</h2>
      <div className={styles.counted}>
        {headings.map(heading => (
          <h3 key={heading}>{heading}</h3>
        ))}
      </div>
      <BrainsContainer header="the key css">
        <pre className={styles.code}>
          <code><CssComments commentClassName={styles.comment}>{`.counted {
  counter-reset: headings;             /* start a counter named "headings" at 0 */

  h3 {
    counter-increment: headings;       /* +1 for every h3 */
    display: flex;
    gap: 0.75em;

    &::before {
      content: counter(headings);      /* print the current count as a badge */
      background: green;
      color: white;
      width: 40px;
      text-align: center;
    }
  }
}`}</CssComments></code>
        </pre>
      </BrainsContainer>
    </div>
  );
}
