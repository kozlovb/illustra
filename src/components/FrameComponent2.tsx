import PropTypes from "prop-types";
import styles from "./FrameComponent2.module.css";

const FrameComponent2 = ({ className = "" }) => {
  return (
    <div className={[styles.placeholderParent, className].join(" ")}>
      <div className={styles.placeholder}>
        <a className={styles.a}>3</a>
      </div>
      <div className={styles.votreContexte}>Vos objectifs</div>
    </div>
  );
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent2;
