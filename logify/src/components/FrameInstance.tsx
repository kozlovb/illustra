import FrameComponent2 from "./FrameComponent2";
import PropTypes from "prop-types";
import styles from "./FrameInstance.module.css";

const FrameInstance = ({ className = "" }) => {
  return (
    <div className={[styles.frameParent, className].join(" ")}>
      <div className={styles.checkboxesParent}>
        <div className={styles.checkboxes}>
          <img
            className={styles.heroiconsOutlinecheck}
            loading="lazy"
            alt=""
            src="/heroiconsoutlinecheck.svg"
          />
        </div>
        <a className={styles.votreSupport}>Votre support</a>
      </div>
      <div className={styles.divider}>
        <div className={styles.divider1} />
      </div>
      <div className={styles.frameGroup}>
        <div className={styles.checkboxes}>
          <img
            className={styles.heroiconsOutlinecheck}
            loading="lazy"
            alt=""
            src="/heroiconsoutlinecheck.svg"
          />
        </div>
        <b className={styles.vosObjectifs}>Vos objectifs</b>
      </div>
      <div className={styles.divider}>
        <div className={styles.divider1} />
      </div>
      <FrameComponent2 />
    </div>
  );
};

FrameInstance.propTypes = {
  className: PropTypes.string,
};

export default FrameInstance;
