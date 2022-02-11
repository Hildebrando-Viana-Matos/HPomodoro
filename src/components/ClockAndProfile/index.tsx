// React
import { useContext } from "react";

// Context
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { CountdownContext } from "../../contexts/CountdownContext";

// Images
import levelImg from "../../assets/images/up.svg";

// Icons
import { FiPlay } from "react-icons/fi";

// Styles
import styles from "./ClockAndProfile.module.scss";

export function ClockAndProfile() {
  const { user } = useContext(AuthContext);

  const { globalTheme } = useContext(ThemeContext);

  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resertCountdown,
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondsLeft, secondsRight] = String(seconds)
    .padStart(2, "0")
    .split("");

  return (
    <div className={styles.mainClock}>
      <div className={`${styles.contentClock} ${styles[globalTheme]}`}>
        <div className={styles.clock}>
          <h1 className={styles[globalTheme]}>
            {minuteLeft}
            {minuteRight}:{secondsLeft}
            {secondsRight}
          </h1>
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.profile}>
          <img src={user?.avatar} alt={`Foto de Perfil de ${user?.name}`} />
          <div className={styles.descriptionAndLevel}>
            <h2>{user?.name}</h2>
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

        {hasFinished ? (
          <button disabled className={`${styles.start} ${styles[globalTheme]}`}>
            <span className={styles[globalTheme]}>Hora do desafio</span>
            <FiPlay size={30} />
          </button>
        ) : (
          <>
            {isActive ? (
              <button
                onClick={resertCountdown}
                className={`${styles.start} ${styles[globalTheme]}`}
              >
                <span className={styles[globalTheme]}>Parar</span>
                <FiPlay size={30} />
              </button>
            ) : (
              <button
                onClick={startCountdown}
                className={`${styles.start} ${styles[globalTheme]}`}
              >
                <span className={styles[globalTheme]}>Começar</span>
                <FiPlay size={30} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
