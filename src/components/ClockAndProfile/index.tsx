// React
import { useContext } from "react";

// Context
import { ThemeContext } from "../../contexts/ThemeContext";
import { CountdownContext } from "../../contexts/CountdownContext";
import { ChallengesContext } from "../../contexts/ChallengesContext";

// Images
import levelImg from "../../assets/images/up.svg";

// Icons
import { FiPlay } from "react-icons/fi";

// Styles
import styles from "./ClockAndProfile.module.scss";

// Hook
import { useAuth } from "../../hooks/useAuth";

// i18n
import { useTranslation } from "react-i18next";

// Helmet
import { Helmet } from "react-helmet-async";

export function ClockAndProfile() {
  const { t } = useTranslation();

  const { user } = useAuth();

  const { level, challengesCompleted } = useContext(ChallengesContext);

  const { globalTheme } = useContext(ThemeContext);

  const { minutes, seconds, isActive, startCountdown, resetCountdown } =
    useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondsLeft, secondsRight] = String(seconds)
    .padStart(2, "0")
    .split("");

  function handleSoundButtonClick(typeButton: string) {
    if (typeButton === "startButton") {
      new Audio("/sounds/start.mp3").play();
    } else if (typeButton === "stopButton") {
      new Audio("/sounds/stop.mp3").play();
    }
  }

  return (
    <>
      <Helmet>
        <title>
          {minuteLeft}
          {minuteRight}:{secondsLeft}
          {secondsRight} - HPomodoro
        </title>
      </Helmet>

      <div className={styles.mainClock}>
        <div className={`${styles.contentClock} ${styles[globalTheme]}`}>
          <div className={styles.clock}>
            <div className={`${styles.clockNumbers} ${styles[globalTheme]}`}>
              <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span>
              </div>
              <div className={styles.twoPonts}>
                <span>:</span>
              </div>
              <div>
                <span>{secondsLeft}</span>
                <span>{secondsRight}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.profile}>
            <img src={user?.avatar} alt={`${user?.name}'s profile`} />
            <div className={styles.descriptionAndLevel}>
              <h2>{user?.name}</h2>
              <div className={styles.contentLevel}>
                <img className={styles.up} src={levelImg} alt="Level Icon" />
                <span>
                  {t("Level")} {level}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.desafios}>
            <h2>
              {t("Challenges Completed")}:{" "}
              <span className={styles[globalTheme]}>{challengesCompleted}</span>
            </h2>
          </div>

          {isActive ? (
            <button
              onClick={() => {
                resetCountdown();
                handleSoundButtonClick("stopButton");
              }}
              className={`${styles.start} ${styles[globalTheme]}`}
            >
              <span className={styles[globalTheme]}>{t("Stop now")}</span>
              <FiPlay size={30} />
            </button>
          ) : (
            <button
              onClick={() => {
                startCountdown();
                handleSoundButtonClick("startButton");
              }}
              className={`${styles.start} ${styles[globalTheme]}`}
            >
              <span className={styles[globalTheme]}>{t("Start now")}</span>
              <FiPlay size={30} />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
