import styles from "./cssGrid.module.scss";

export default function CssGrid() {
  const { gridContainer, item } = styles;

  return (
    <div className={gridContainer}>
      <h1>CSS Madness, onboarding Mixins</h1>
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
      </section>
      <section>
        <h2>auto-resize textarea</h2>
        <textarea name="" id=""></textarea>
      </section>
      <section>
        <h2>relative padding</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          corrupti obcaecati perferendis quaerat culpa odio voluptatum expedita
          tempora quam, in id, velit neque? Necessitatibus nisi dolores totam
          fugit adipisci voluptate, consequatur beatae asperiores quis, nihil
          quibusdam ullam nemo sequi natus?
        </p>
      </section>
      <section>
        <h2>CSS-only responsive menu</h2>
        <input type="checkbox" id={styles.menuActive} />
        <label htmlFor={styles.menuActive} id={styles.overlay}></label>
        <label htmlFor={styles.menuActive} className={styles.openMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" ><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
        </label>

        <nav>
          <ul>
            <li>
              <a href="#">home</a>
            </li>
            <li>
              <a href="#">about</a>
            </li>
            <li>contact</li>
            <li>products</li>
          </ul>
        </nav>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse labore
          ipsa nisi reiciendis, eum dolorem qui, eligendi fugiat architecto
          alias dolore! Consequuntur possimus eaque et dolores laudantium
          quaerat natus quisquam dolore vel nisi perspiciatis officia esse,
          commodi doloribus delectus neque enim dolorem! Delectus architecto
          consequatur asperiores perferendis, quia rem doloremque esse
          exercitationem autem corporis dignissimos, nulla veniam fuga velit
          repellat error natus labore neque distinctio aperiam. Earum aspernatur
          illum, possimus odit, ad placeat ipsa aliquam natus numquam obcaecati
          asperiores quasi voluptate iste sint beatae vitae quidem aliquid fuga
          doloribus. Consectetur atque beatae at corporis rem numquam adipisci
          cupiditate nam dolore?
        </p>
      </section>
      <section style={{ height: "400px" }}></section>
    </div>
  );
}
