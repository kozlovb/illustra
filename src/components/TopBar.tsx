import Button1 from "./Button1";
import PropTypes from "prop-types";
import styles from "./TopBar.module.css";

const TopBar = ({ className = "" }) => {
  return (
    <div className={[styles.topbar, className].join(" ")}>
      <div className={styles.breadcrumbs}>
        <div className={styles.breadcrumbs1}>
          <img className={styles.separatorIcon} alt="" src="/separator.svg" />
          <div className={styles.text}>Breadcrumbs</div>
        </div>
        <div className={styles.breadcrumbs2}>
          <img className={styles.separatorIcon1} alt="" src="/separator.svg" />
          <div className={styles.text}>Breadcrumbs</div>
        </div>
        <div className={styles.breadcrumbs2}>
          <img className={styles.separatorIcon1} alt="" src="/separator.svg" />
          <div className={styles.text}>Breadcrumbs</div>
        </div>
        <div className={styles.breadcrumbs2}>
          <img className={styles.separatorIcon1} alt="" src="/separator.svg" />
          <div className={styles.text}>Breadcrumbs</div>
        </div>
        <div className={styles.breadcrumbs2}>
          <img className={styles.separatorIcon1} alt="" src="/separator.svg" />
          <div className={styles.text}>Breadcrumbs</div>
        </div>
        <div className={styles.breadcrumbs6}>
          <img className={styles.separatorIcon1} alt="" src="/separator.svg" />
          <div className={styles.text}>Breadcrumbs</div>
        </div>
      </div>
      <Button1
        propHeight="32px"
        propPadding="0px 0px 0px"
        heroiconsOutlinexMark="/heroiconsoutlinearrowleft.svg"
        propOverflow="unset"
      />
      <div className={styles.topbarInner}>
        <div className={styles.difficultCommuniquerParent}>
          <div className={styles.difficultCommuniquer}>
            Gestion du stress de fin d’année
          </div>
          <input className={styles.heroiconsMinipencilSquare} type="checkbox" />
        </div>
      </div>
      <div className={styles.textParent}>
        <a className={styles.text6}>Quitter</a>
        <Button1 heroiconsOutlinexMark="/heroiconsoutlinexmark.svg" />
      </div>
    </div>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};

export default TopBar;
