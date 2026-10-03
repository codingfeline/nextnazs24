import CssColumns from "./cssColumns";
import { CssComments } from "./cssComments";
import CssCornerShape from "./cssCornerShape";
import CssCounterHeadings from "./cssCounterHeadings";
import CssRelativePadding from "./cssRelativePadding";
import CssResponsiveFont from "./cssResponsiveFont";
import styles from "./cssGrid.module.scss";

export default function CssGrid() {
  const { gridContainer, item } = styles;

  return (
    <div className={gridContainer}>
      <h1>CSS Madness</h1>
      <section>
        <h2>responsive columns</h2>
        <div>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
          <div>Item 5</div>
          <div>Item 6</div>
          <div>Item 7</div>
          <div>Item 8</div>
          <div>Item 9</div>
        </div>
        <pre className={styles.code}>
          <code><CssComments commentClassName={styles.comment}>{`.container { 
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
}`}</CssComments></code>
        </pre>
      </section>
      <section>
        <h2>auto-resize textarea</h2>
        <textarea name="" id=""></textarea>
        <pre className={styles.code}>
          <code><CssComments commentClassName={styles.comment}>{`textarea  { field-sizing: content; }`}</CssComments></code>
        </pre>
      </section>
      <section>
        <h2>responsive padding w/o media query</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          corrupti obcaecati perferendis quaerat culpa odio voluptatum expedita
          tempora quam, in id, velit neque? Necessitatibus nisi dolores totam
          fugit adipisci voluptate, consequatur beatae asperiores quis, nihil
          quibusdam ullam nemo sequi natus?
        </p>
        <pre className={styles.code}>
          <code><CssComments commentClassName={styles.comment}>{`p  { padding: min(3em, 9%); }`}</CssComments></code>
        </pre>
      </section>
      <section>
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
            <li>
              home
            </li>
            <li>
              about
            </li>
            <li>contact</li>
            <li>products</li>
          </ul>
        </nav>
        {/* <h3>key properties</h3> */}
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
      </section>

      <section>
        <CssColumns />
      </section>
      <section>
        <CssRelativePadding />
      </section>
      <section>
        <CssResponsiveFont />
      </section>
      <section>
        <CssCounterHeadings />
      </section>
      <section>
        <CssCornerShape />
      </section>
    </div>
  );
}
