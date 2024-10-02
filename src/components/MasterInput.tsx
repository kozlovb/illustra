import FrameComponent1 from "./FrameComponent1";
import PropTypes from "prop-types";
import styles from "./MasterInput.module.css";

const MasterInput = ({ className = "" }) => {
  return (
    <div className={[styles.masterinput, className].join(" ")}>
      <div className={styles.top}>
        <div className={styles.label}>Label</div>
        <div className={styles.helpText}>Help text</div>
      </div>
      <FrameComponent1 />
      <div className={styles.caption}>
        Caption text, description, error notification
      </div>
    </div>
  );
};

MasterInput.propTypes = {
  className: PropTypes.string,
};

export default MasterInput;
