import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./FrameComponent.module.css";

const FrameComponent = ({
  className = "",
  propMarginTop,
  placeholder,
  propHeight,
}) => {
  const frameDivStyle = useMemo(() => {
    return {
      marginTop: propMarginTop,
    };
  }, [propMarginTop]);

  const placeholderStyle = useMemo(() => {
    return {
      height: propHeight,
    };
  }, [propHeight]);

  return (
    <div
      className={[styles.frameParent, className].join(" ")}
      style={frameDivStyle}
    >
      <div className={styles.frameWrapper}>
        <div className={styles.shapesWrapper}>
          <div className={styles.shapes}>
            <img
              className={styles.shapesChild}
              loading="lazy"
              alt=""
              src="/ellipse-16@2x.png"
            />
            <div className={styles.shapesItem} />
          </div>
        </div>
      </div>
      <div className={styles.placeholder} style={placeholderStyle}>
        {placeholder}
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,

  /** Style props */
  propMarginTop: PropTypes.any,
  propHeight: PropTypes.any,
};

export default FrameComponent;
