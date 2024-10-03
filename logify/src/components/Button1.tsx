import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./Button1.module.css";

const Button1 = ({
  className = "",
  propHeight,
  propPadding,
  heroiconsOutlinexMark,
  propOverflow,
}) => {
  const button1Style = useMemo(() => {
    return {
      height: propHeight,
      padding: propPadding,
    };
  }, [propHeight, propPadding]);

  const heroiconsOutlinexMarkStyle = useMemo(() => {
    return {
      overflow: propOverflow,
    };
  }, [propOverflow]);

  return (
    <div className={[styles.button, className].join(" ")} style={button1Style}>
      <div className={styles.masterbuttondesktop}>
        <img
          className={styles.heroiconsOutlinexMark}
          loading="lazy"
          alt=""
          src={heroiconsOutlinexMark}
          style={heroiconsOutlinexMarkStyle}
        />
      </div>
    </div>
  );
};

Button1.propTypes = {
  className: PropTypes.string,
  heroiconsOutlinexMark: PropTypes.string,

  /** Style props */
  propHeight: PropTypes.any,
  propPadding: PropTypes.any,
  propOverflow: PropTypes.any,
};

export default Button1;
