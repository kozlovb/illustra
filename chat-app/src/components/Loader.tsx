import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles['dots-loader']}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
};

export default Loader;
