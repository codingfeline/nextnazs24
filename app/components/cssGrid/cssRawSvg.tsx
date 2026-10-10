import styles from "./cssRawSvg.module.scss";

const RawSvg = () => {
  return (
    <div className={styles.svg}>
      <h2>Raw SVG</h2>
      <svg width="300" height="300" viewBox="0 0 300 300">
        <circle cx="0" cy="0" r="100" fill="blue" />
        <circle className={styles.c1} cx="300" cy="300" r="100" fill="blue" stroke="black" />
      </svg>
    </div>
  )
}

export default RawSvg