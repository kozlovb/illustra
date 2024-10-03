import Help from "./Help";
import PropTypes from "prop-types";
import styles from "./Sidebar.module.css";

const Sidebar = ({ className = "" }) => {
  return (
    <div className={[styles.sidebar, className].join(" ")}>
      <img
        className={styles.sidebarChild}
        loading="lazy"
        alt=""
        src="/frame-74940@2x.png"
      />
      <section className={styles.sidebarInner}>
        <div className={styles.chatHeaderParent}>
          <div className={styles.chatHeader}>
            <div className={styles.votreAssistant}>VOTRE ASSISTANT</div>
            <h1 className={styles.commentDiscuterAvec}>
              Comment dialoguer avec l’IA ?
            </h1>
          </div>
          <Help />
        </div>
      </section>
      <img
        className={styles.groupIcon}
        loading="lazy"
        alt=""
        src="/group.svg"
      />
    </div>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;
