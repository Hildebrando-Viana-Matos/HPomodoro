// React
import { useContext } from "react";

// Context
import { ThemeContext } from "../../contexts/ThemeContext";

// Images
import levelImg from "../../assets/images/up.svg";

// Icons
import { FiPlay } from "react-icons/fi";

// Styles
import styles from "./ClockAndProfile.module.scss";

export function ClockAndProfile() {
  const { globalTheme } = useContext(ThemeContext);
  return (
    <div className={styles.mainClock}>
      <div className={`${styles.contentClock} ${styles[globalTheme]}`}>
        <div className={styles.clock}>
          <h1 className={styles[globalTheme]}>25:00</h1>
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.profile}>
          <img
            src="https://github.com/Hildebrando-Viana-Matos.png"
            alt="Foto de Perfil de Hildebrando Viana Matos"
          />
          <div className={styles.descriptionAndLevel}>
            <h2>Hildebrando Viana Matos</h2>
            <div className={styles.contentLevel}>
              <img className={styles.up} src={levelImg} alt="Level Icon" />
              <span>Level 1</span>
            </div>
          </div>
        </div>

        <div className={styles.desafios}>
          <h2>
            Desafios Completados:{" "}
            <span className={styles[globalTheme]}>08</span>
          </h2>
        </div>

        <button className={`${styles.start} ${styles[globalTheme]}`}>
          <span className={styles[globalTheme]}>Começar</span>
          <FiPlay size={30} />
        </button>
      </div>
    </div>
  );
}
