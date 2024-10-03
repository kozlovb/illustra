import PropTypes from "prop-types";
import styles from "./Help.module.css";

const Help = ({ className = "" }) => {
  return (
    <div className={[styles.help, className].join(" ")}>
      <div className={styles.helpInner}>
        <img className={styles.frameChild} alt="" src="/group-29.svg" />
      </div>
      <img className={styles.component2Icon} alt="" src="/component-2.svg" />
    </div>
  );
};

Help.propTypes = {
  className: PropTypes.string,
};

export default Help;
