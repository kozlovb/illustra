import MasterInput from "./MasterInput";
import PropTypes from "prop-types";
import styles from "./Input1.module.css";

const Input1 = ({ className = "" }) => {
  return (
    <div className={[styles.input, className].join(" ")}>
      <MasterInput />
    </div>
  );
};

Input1.propTypes = {
  className: PropTypes.string,
};

export default Input1;
