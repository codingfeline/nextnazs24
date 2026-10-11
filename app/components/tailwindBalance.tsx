import MainPage from "./MainPage";
import styles from "./cssTailwindBalance.module.scss";

export default function TailwindBalance() {
  return (
    <MainPage bg={styles.bg_css}>
      <div className={styles.panel}>
      <h1>CSS and Tailwind CSS: Finding the Right Balance</h1>



<p>
  Having worked on Next.js projects for several years, I have grown to appreciate
  how much Tailwind CSS can simplify and speed up the styling process. There is
  something satisfying about being able to build a UI quickly without constantly
  switching between HTML and CSS files.
</p>

<p>
  However, recently, I had a bit of a wake-up call.
</p>

<p>
  While working on some mini projects using vanilla CSS and JavaScript (ES5),
  I found myself struggling with even some of the basic CSS syntax. I couldn't
  help but reflect on how relying on the convenience of Tailwind had gradually
  made me less familiar with the very fundamentals I started with.
</p>

<p>
  It was a humbling experience. I realised that 
  <strong> knowing how to use a tool efficiently is not necessarily the same as
  mastering the skills behind it (what goes under the hood).</strong>
</p>

<p>
  That realisation prompted me to rethink my workflow. Instead of relying
  entirely on Tailwind CSS, I have started incorporating
  <code>*.module.scss</code> into my Next.js projects.
</p>

<p>
  This gives me the best of both worlds. I can continue practising vanilla CSS
  while exploring the benefits of Sass, particularly mixins, variables, and
  reusable styles. Although modern CSS now supports nesting, Sass still offers
  features that I find valuable in keeping my code organised and maintainable.
</p>

<p>
  I am not abandoning Tailwind. Rather, I want to ensure that I can work
  confidently with or without it.
</p>

<p>
  <strong>For me, this is a reminder that learning never really stops. </strong>
  As developers, it is easy to become comfortable with tools that make our lives
  easier, but sometimes we need to take a step back, revisit the fundamentals,
  and challenge ourselves again.
</p>

<p>
  After all, tools will come and go, but a solid understanding of the
  fundamentals will always be worth investing in.
</p>

      </div>
    </MainPage>
  )
}
