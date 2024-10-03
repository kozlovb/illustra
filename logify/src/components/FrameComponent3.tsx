import PropTypes from "prop-types";
import styles from "./FrameComponent3.module.css";

const FrameComponent3 = ({ className = "" }) => {
  return (
    <div className={[styles.frameParent, className].join(" ")}>
      <img
        className={styles.instanceChild}
        loading="lazy"
        alt=""
        src="/group-32-1.svg"
      />
      <div className={styles.element} />
    </div>
  );
};

FrameComponent3.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent3;
