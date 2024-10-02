import PropTypes from "prop-types";
import styles from "./FrameComponent1.module.css";

const FrameComponent1 = ({ className = "" }) => {
  return (
    <div className={[styles.fieldWrapper, className].join(" ")}>
      <div className={styles.field}>
        <div className={styles.label}>Label</div>
        <input className={styles.text} placeholder="Placeholder" type="text" />
      </div>
    </div>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;
