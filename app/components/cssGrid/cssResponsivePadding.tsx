import BrainsContainer from "../BrainsContainer";
import { CssComments } from "./cssComments";
import styles from "./cssResponsivePadding.module.scss";

export default function CssResponsivePadding() {
  return (
    <div className={styles.box}>
      <h2>responsive padding w/o media query</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
        corrupti obcaecati perferendis quaerat culpa odio voluptatum expedita
        tempora quam, in id, velit neque? Necessitatibus nisi dolores totam
        fugit adipisci voluptate, consequatur beatae asperiores quis, nihil
        quibusdam ullam nemo sequi natus?
      </p>
      <BrainsContainer header="the key css">
        <pre className={styles.code}>
          <code><CssComments commentClassName={styles.comment}>{`p  { padding: min(3em, 9%); }`}</CssComments></code>
        </pre>
      </BrainsContainer>
    </div>
  );
}
