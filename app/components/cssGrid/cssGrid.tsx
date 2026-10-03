import BackToTop from "../BackToTop";
import CssAutoTextarea from "./cssAutoTextarea";
import CssColumns from "./cssColumns";
import CssCornerShape from "./cssCornerShape";
import CssCounterHeadings from "./cssCounterHeadings";
import CssRelativePadding from "./cssRelativePadding";
import CssResponsiveColumns from "./cssResponsiveColumns";
import CssResponsiveFont from "./cssResponsiveFont";
import CssResponsiveMenu from "./cssResponsiveMenu";
import CssResponsivePadding from "./cssResponsivePadding";
import styles from "./cssGrid.module.scss";

export default function CssGrid() {
  return (
    <div className={styles.gridContainer}>
      <h1>CSS Madness</h1>
      <section>
        <CssResponsiveColumns />
      </section>
      <section className={styles.green}>
        <CssAutoTextarea />
      </section>
      <section>
        <CssResponsivePadding />
      </section>
      <section>
        <CssResponsiveMenu />
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
      <BackToTop />
    </div>
  );
}
