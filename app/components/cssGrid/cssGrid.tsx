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
        <h2>textarea</h2>
        <textarea name="" id=""></textarea>
      </section>
      <section>
        <h2>relative padding</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi corrupti obcaecati perferendis quaerat culpa odio voluptatum expedita tempora quam, in id, velit neque? Necessitatibus nisi dolores totam fugit adipisci voluptate, consequatur beatae asperiores quis, nihil quibusdam ullam nemo sequi natus?
        </p>
        </section>
    </div>
  );
}
