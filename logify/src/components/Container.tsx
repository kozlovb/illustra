import FrameComponent from "./FrameComponent";
import PropTypes from "prop-types";
import styles from "./Container.module.css";

const Container = ({ className = "" }) => {
  return (
    <div className={[styles.container, className].join(" ")}>
      <div className={styles.rectangleParent}>
        <img
          className={styles.frameChild}
          loading="lazy"
          alt=""
          src="/rectangle-1@2x.png"
        />
        <div className={styles.placeholder}>
          Bonjour, je me sens stressée, je suis confrontée à une charge de
          travail importante et une deadline imminente. Nous avons un projet
          majeur qui doit être finalisé avant les vacances, et il semble que
          nous soyons en retard sur notre planning. Je me sens responsable, car
          en tant que Chef de Projet, c'est à moi de veiller à ce que tout soit
          livré à temps. De plus, l'équipe est sous pression et je crains que
          cela ne se répercute sur leur bien-être et leur productivité.
        </div>
        <div className={styles.frameParent}>
          <div className={styles.frameWrapper}>
            <img
              className={styles.frameItem}
              loading="lazy"
              alt=""
              src="/group-37.svg"
            />
          </div>
          <div className={styles.placeholderWrapper}>
            <div className={styles.placeholder1}>
              <p
                className={styles.bienvenueSurCe}
              >{`Bienvenue sur ce Chatbot ! Si vous avez des questions ou besoin d'aide, `}</p>
              <p className={styles.bienvenueSurCe}>
                n'hésitez pas à me le faire savoir. Je suis là pour vous
                assister !
              </p>
            </div>
          </div>
        </div>
      </div>
      <FrameComponent placeholder="Je vois, cela semble être une période exigeante pour vous et votre équipe. En plus du retard sur le planning, y a-t-il d'autres facteurs qui contribuent à votre stress actuellement ?" />
      <div className={styles.frameGroup}>
        <div className={styles.placeholderContainerWrapper}>
          <div className={styles.placeholderContainer}>
            <img
              className={styles.frameChild}
              loading="lazy"
              alt=""
              src="/rectangle-1@2x.png"
            />
            <div className={styles.placeholder2}>
              Oui, en plus des délais, il y a la pression pour maintenir la
              qualité du travail. Cela m'oblige à jongler entre différentes
              tâches et responsabilités, ce qui est assez épuisant.
            </div>
          </div>
        </div>
        <footer className={styles.frameContainer}>
          <div className={styles.frameDiv}>
            <div className={styles.groupDiv}>
              <div className={styles.ellipseParent}>
                <img
                  className={styles.frameInner}
                  alt=""
                  src="/ellipse-16@2x.png"
                />
                <div className={styles.rectangleDiv} />
              </div>
            </div>
          </div>
          <div className={styles.placeholder3}>Décrivez votre situation</div>
        </footer>
        <FrameComponent
          propMarginTop="-26px"
          placeholder="Cela semble être un défi de taille, jongler entre la gestion des attentes, la qualité du projet et le bien-être de l'équipe. Comment pensez-vous que cette situation affecte votre équipe ?"
          propHeight="60px"
        />
      </div>
      <div className={styles.rectangleGroup}>
        <img
          className={styles.frameChild}
          loading="lazy"
          alt=""
          src="/rectangle-1@2x.png"
        />
        <div className={styles.placeholder4}>
          Je peux voir qu'ils sont également stressés et fatigués. Certains
          commencent à montrer des signes de frustration, ce qui est
          compréhensible, mais cela crée une ambiance tendue au sein de
          l'équipe.
        </div>
      </div>
      <FrameComponent
        propMarginTop="unset"
        placeholder="Merci, Sophie, pour ce partage. Sur la base de cette analyse, je vais vous faire une fiche récapitulatif de votre contexte pour cela passez à l’étape suivante."
        propHeight="unset"
      />
    </div>
  );
};

Container.propTypes = {
  className: PropTypes.string,
};

export default Container;
