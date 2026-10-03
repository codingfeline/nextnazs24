import BrainsContainer from "../BrainsContainer";
import { CssComments } from "./cssComments";
import styles from "./cssAutoTextarea.module.scss";

export default function CssAutoTextarea() {
  return (
    <div className={styles.box}>
      <h2>auto-resize textarea</h2>
      <textarea name="" id=""></textarea>
      <BrainsContainer header="the key css">
        <pre className={styles.code}>
          <code><CssComments commentClassName={styles.comment}>{`textarea  { field-sizing: content; }`}</CssComments></code>
        </pre>
      </BrainsContainer>
    </div>
  );
}
