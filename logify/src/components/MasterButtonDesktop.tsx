import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./MasterButtonDesktop.module.css";

const MasterButtonDesktop = ({
  className = "",
  iconeR = false,
  iconeL = false,
  propBackgroundColor,
  propAlignSelf,
  propFlex,
  propBorder,
  heroiconsOutlinearrowLeft,
  text,
  propColor,
  heroiconsOutlinearrowRight,
}) => {
  const masterButtonDesktopStyle = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
      alignSelf: propAlignSelf,
      flex: propFlex,
      border: propBorder,
    };
  }, [propBackgroundColor, propAlignSelf, propFlex, propBorder]);

  const textStyle = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);

  return (
    <div
      className={[styles.masterbuttondesktop, className].join(" ")}
      style={masterButtonDesktopStyle}
    >
      {iconeR && (
        <img
          className={styles.heroiconsOutlinearrowLeft}
          alt=""
          src={heroiconsOutlinearrowLeft}
        />
      )}
      <div className={styles.text} style={textStyle}>
        {text}
      </div>
      {iconeL && (
        <img
          className={styles.heroiconsOutlinearrowLeft}
          alt=""
          src={heroiconsOutlinearrowRight}
        />
      )}
    </div>
  );
};

MasterButtonDesktop.propTypes = {
  className: PropTypes.string,
  iconeR: PropTypes.bool,
  iconeL: PropTypes.bool,
  heroiconsOutlinearrowLeft: PropTypes.string,
  text: PropTypes.string,
  heroiconsOutlinearrowRight: PropTypes.string,

  /** Style props */
  propBackgroundColor: PropTypes.any,
  propAlignSelf: PropTypes.any,
  propFlex: PropTypes.any,
  propBorder: PropTypes.any,
  propColor: PropTypes.any,
};

export default MasterButtonDesktop;
