import BrainsContainer from "../BrainsContainer";
import { CssComments } from "./cssComments";
import styles from "./cssResponsiveColumns.module.scss";

const items = Array.from({ length: 9 }, (_, i) => `Item ${i + 1}`);

export default function CssResponsiveColumns() {
  return (
    <div className={styles.box}>
      <h2>responsive columns</h2>
      <div className={styles.grid}>
        {items.map(item => (
          <div key={item}>{item}</div>
        ))}
      </div>
      <BrainsContainer header="the key css">
        <pre className={styles.code}>
          <code><CssComments commentClassName={styles.comment}>{`.container {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}`}</CssComments></code>
        </pre>
      </BrainsContainer>
    </div>
  );
}
