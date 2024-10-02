import FrameComponent3 from "./FrameComponent3";
import PropTypes from "prop-types";
import styles from "./CardMembership.module.css";

const CardMembership = ({ className = "" }) => {
  return (
    <div className={[styles.cardMembership, className].join(" ")}>
      <section className={styles.backgroundParent}>
        <div className={styles.background} />
        <img
          className={styles.intersectIcon}
          rows={5}
          cols={18}
          alt=""
          src="/intersect.svg"
        />
        <div className={styles.frameParent}>
          <img className={styles.frameChild} alt="" src="/group-32.svg" />
          <div className={styles.element} />
          <FrameComponent3 />
        </div>
        <div className={styles.placeholderParent}>
          <div className={styles.placeholder} />
          <div className={styles.progressIndicatorBar}>
            <div className={styles.track} />
            <div className={styles.fill} />
            <div className={styles.fill1} />
            <div className={styles.fill2} />
            <div className={styles.fill3} />
            <div className={styles.fill4} />
            <div className={styles.fill5} />
          </div>
          <div className={styles.vousAvezComplt}>
            Vous avez complété la première étape
          </div>
        </div>
        <div className={styles.uneVraisFuseWrapper}>
          <a className={styles.uneVraisFuse}>Une vraie fusée</a>
        </div>
      </section>
    </div>
  );
};

CardMembership.propTypes = {
  className: PropTypes.string,
};

export default CardMembership;
