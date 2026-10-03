import BrainsContainer from "../BrainsContainer";
import { CssComments } from "./cssComments";
import styles from "./cssBorderImage.module.scss";

export default function CssBorderImage() {
  return (
    <div className={styles.box}>
      <h2>border image</h2>
      <div className={styles.spinner}></div>
      <BrainsContainer header="the key css">
        <pre className={styles.code}>
          <code><CssComments commentClassName={styles.comment}>{`/* register --angle as a real <angle> so it can be animated */
@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.spinner {
  border: 8px solid black;   /* border-image paints into this width */
  border-image: conic-gradient(from var(--angle), blue, red, yellow, blue) 1;
  animation: 2s spin linear infinite;
}

@keyframes spin {
  from { --angle: 0deg; }
  to   { --angle: 360deg; }    /* rotates the gradient start point */
}
/* note: border-image ignores border-radius, so the corners stay square */`}</CssComments></code>
        </pre>
      </BrainsContainer>
    </div>
  );
}
