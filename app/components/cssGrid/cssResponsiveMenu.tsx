import { CssComments } from "./cssComments";
import styles from "./cssResponsiveMenu.module.scss";

export default function CssResponsiveMenu() {
  return (
    <div className={styles.box}>
      <h2>CSS-only responsive menu</h2>
      <input type="checkbox" id={styles.menuActive} />
      <label htmlFor={styles.menuActive} id={styles.overlay}></label>
      <label htmlFor={styles.menuActive} className={styles.openMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="32px"
          viewBox="0 -960 960 960"
          width="32px"
        >
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
      </label>

      <nav>
        <ul>
          <li>home</li>
          <li>about</li>
          <li>contact</li>
          <li>products</li>
        </ul>
      </nav>
      <pre className={styles.code}>
        <code><CssComments commentClassName={styles.comment}>{`/* 1. The hidden checkbox stores open/closed. Labels toggle it. */
#menuActive { display: none; }

/* 2. The MENU button is hidden on desktop */
.openMenu { display: none; }

@media (max-width: 700px) {            /* 3. breakpoint */
  .openMenu { display: block; }        /* show the button */

  ul {
    flex-direction: column;            /* stack the links */
    position: absolute;                /* real app would use fixed property */
    right: 200%;                       /* park the panel off-screen */
    transition: right 200ms ease-in-out;
    z-index: 10;                       /* above the overlay */
  }

  /* 4. checked = open */
  #menuActive:checked ~ nav ul { right: 0; }             /* slide in */
  #menuActive:checked ~ #overlay {
    display: block;
    position: absolute;
    inset: 0;                          /* shorthand for top/right/bottom/left: 0 */
    background: rgba(0, 0, 0, 0.5);    /* dim the page */
    z-index: 9;
  }
}`}</CssComments></code>
      </pre>
    </div>
  );
}
