import BrainsContainer from "../BrainsContainer";
import { CssComments } from "./cssComments";
import styles from "./cssColumns.module.scss";

// picsum.photos/id/{id}/{width}/{height} — mixed sizes show off the masonry flow.
const images = [
  "10/900/300",
  "20/200/400",
  "30/800/400",
  "40/400/200",
  "50/500/200",
  "60/700/200",
  "70/200/200",
  "80/600/200",
  "90/300/200",
];

export default function CssColumns() {
  return (
    <div className={styles.box}>
      <h2>columns</h2>
      <div className={styles.images}>
        {images.map(src => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={`https://picsum.photos/id/${src}`} alt="" />
        ))}
      </div>
      <BrainsContainer header="the key css">
        <pre className={styles.code}>
          <code><CssComments commentClassName={styles.comment}>{`.images {
  width: min(1000px, 100%);
  columns: 4 200px;     /* up to 4 columns, each at least 200px wide */
  column-gap: 0.5em;

  img {
    width: 100%;        /* fills its column */
    display: block;     /* removes the inline gap below each image */
    margin-bottom: 0.5em;
  }
}`}</CssComments></code>
        </pre>
      </BrainsContainer>
    </div>
  );
}
