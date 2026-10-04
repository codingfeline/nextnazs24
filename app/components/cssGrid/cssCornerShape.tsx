import BrainsContainer from "../BrainsContainer";
import { CssComments } from "./cssComments";
import styles from "./cssCornerShape.module.scss";

export default function CssCornerShape() {
  return (
    <div className={styles.box}>
      <h2>corner shapes</h2>
      <h3>notch and superellipse</h3>
      <div className={styles.shape}></div>
      <BrainsContainer header="the key css">
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
      </BrainsContainer>

        <hr className={styles.hr} />
        <h3>clip-path circle</h3>
        <div className={styles.corners}>
        </div>
        <BrainsContainer header="the key css">
          <pre className={styles.code}>
            <code><CssComments commentClassName={styles.comment}>{`.corners {
  background: green;
  border-radius: 55px;
  corner-shape: square scoop square square;  /* scoop the top-right corner inwards */

  &::after {
    content: '';
    background: red;
    clip-path: circle(50px at right top);    /* only a circle centred on the top-right corner shows */
  }
  &:hover { border-radius: 60px; }                          /* scoop grows... */
  &:hover::after { clip-path: circle(55px at right top); }  /* ...and so does the circle */
}`}</CssComments></code>
          </pre>
        </BrainsContainer>
        <hr className={styles.hr} />
        <h3>clip-path path</h3>
        <div className={styles.custom}>
        </div>
        <BrainsContainer header="the key css">
          <pre className={styles.code}>
            <code><CssComments commentClassName={styles.comment}>{`/* blue is ::before, not .custom: clip-path on .custom would clip the red ::after too */
.custom::before {
  background: blue;
  /* M move, H/V horizontal/vertical line, A arc, Z close.
     Traces the blue with the red's shape (+5px gap) cut out of the top-left */
  clip-path: path("M 205 0 H 400 V 200 H 0 V 105 H 180 A 25 25 0 0 0 205 80 Z");
}
.custom::after {
  width: 200px;
  height: 100px;
  background: red;
  border-radius: 20px;
  corner-shape: round square round square;
}
.custom:hover::before {
  /* same commands in the same order, so the path can animate */
  clip-path: path("M 210 0 H 400 V 200 H 0 V 110 H 185 A 25 25 0 0 0 210 85 Z");
}
.custom:hover::after {
  width: 205px;
  height: 105px;
}`}</CssComments></code>
          </pre>
        </BrainsContainer>
    </div>
  );
}
