import CssAutoTextarea from "./cssAutoTextarea";
import CssBorderImage from "./cssBorderImage";
import CssColumns from "./cssColumns";
import CssCornerShape from "./cssCornerShape";
import CssCounterHeadings from "./cssCounterHeadings";
import CssRelativePadding from "./cssRelativePadding";
import CssResponsiveColumns from "./cssResponsiveColumns";
import CssResponsiveFont from "./cssResponsiveFont";
import CssResponsiveMenu from "./cssResponsiveMenu";
import CssResponsivePadding from "./cssResponsivePadding";
import styles from "./cssGrid.module.scss";
import RawSvg from "./cssRawSvg";

export default function CssGrid() {
  return (
    <div className={styles.gridContainer}>
      <h1>CSS-Impress</h1>
      <ul className={styles.anchors}>
        <li><a href="#responsive-columns">Responsive Columns</a></li>
        <li><a href="#auto-textarea">Auto Textarea</a></li>
        <li><a href="#responsive-padding">Responsive Padding</a></li>
        <li><a href="#responsive-menu">Responsive Menu</a></li>
        <li><a href="#columns">Columns</a></li>
        <li><a href="#relative-padding">Relative Padding</a></li>
        <li><a href="#responsive-font">Responsive Font</a></li>
        <li><a href="#counter-headings">Counter Headings</a></li>
        <li><a href="#corner-shape">Corner Shape</a></li>
        <li><a href="#clip-path-circle">Clip-path Circle</a></li>
        <li><a href="#clip-path-path">Clip-path Path</a></li>
        <li><a href="#clip-path-heart">Clip-path Heart</a></li>
        <li><a href="#border-image">Border Image</a></li>
      </ul>
      <section id="responsive-columns">
        <CssResponsiveColumns />
      </section>
      <section id="auto-textarea" className={styles.green}>
        <CssAutoTextarea />
      </section>
      <section id="responsive-padding">
        <CssResponsivePadding />
      </section>
      <section id="responsive-menu">
        <CssResponsiveMenu />
      </section>
      <section id="columns">
        <CssColumns />
      </section>
      <section id="relative-padding">
        <CssRelativePadding />
      </section>
      <section id="responsive-font">
        <CssResponsiveFont />
      </section>
      <section id="counter-headings">
        <CssCounterHeadings />
      </section>
      <section id="corner-shape">
        <CssCornerShape />
      </section>
      <section id="border-image">
        <CssBorderImage />
      </section>
      <section id="raw-svg">
        <RawSvg />
      </section>
    </div>
  );
}
