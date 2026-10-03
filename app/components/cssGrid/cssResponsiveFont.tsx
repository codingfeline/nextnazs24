import { CssComments } from "./cssComments";
import styles from "./cssResponsiveFont.module.scss";

export default function CssResponsiveFont() {
  return (
    <div className={styles.box}>
      {/* <h2>responsive font-size</h2> */}
      <h1 className={styles.bigHeading}>responsive font-size</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum magnam
        officiis velit reprehenderit, omnis sequi cum voluptates dolore laborum
        qui.
      </p>
      <pre className={styles.code}>
        <code><CssComments commentClassName={styles.comment}>{`h1 {
  /* clamp(min, preferred, max): grows with the viewport width,
     but never below 1.8rem or above 5rem */
  font-size: clamp(1.8rem, calc(7vw + 1rem), 5rem);
}`}</CssComments></code>
      </pre>
    </div>
  );
}
