import MainPage from './MainPage';
import styles from './codingBlogs.module.scss';

export default function CodingBlogs() {
  return (
    <MainPage bg={styles.bg_css}>
      <div className={styles.panel}>
        <h1>Coding Blogs</h1>
        <span className={styles.date}>October 1, 2023</span>
      </div>
    </MainPage>
  )
}
