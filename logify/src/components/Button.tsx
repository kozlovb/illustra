import { useMemo } from "react";
import MasterButtonDesktop from "./MasterButtonDesktop";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({
  className = "",
  propHeight,
  heroiconsOutlinearrowLeft,
  text,
  heroiconsOutlinearrowRight,
  iconeR,
  iconeL,
  propBackgroundColor,
  propAlignSelf,
  propFlex,
  propBorder,
  propColor,
}) => {
  const buttonStyle = useMemo(() => {
    return {
      height: propHeight,
    };
  }, [propHeight]);

  return (
    <div className={[styles.button, className].join(" ")} style={buttonStyle}>
      <MasterButtonDesktop
        iconeR={iconeR}
        iconeL={iconeL}
        propBackgroundColor={propBackgroundColor}
        propAlignSelf={propAlignSelf}
        propFlex={propFlex}
        propBorder={propBorder}
        heroiconsOutlinearrowLeft={heroiconsOutlinearrowLeft}
        text={text}
        propColor={propColor}
        heroiconsOutlinearrowRight={heroiconsOutlinearrowRight}
      />
    </div>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  heroiconsOutlinearrowLeft: PropTypes.string,
  text: PropTypes.string,
  heroiconsOutlinearrowRight: PropTypes.string,
  iconeR: PropTypes.bool,
  iconeL: PropTypes.bool,
  propBackgroundColor: PropTypes.string,
  propAlignSelf: PropTypes.string,
  propFlex: PropTypes.string,
  propBorder: PropTypes.string,
  propColor: PropTypes.string,

  /** Style props */
  propHeight: PropTypes.any,
};

export default Button;
