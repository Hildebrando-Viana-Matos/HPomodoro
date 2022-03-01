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
import { useUser } from "../../hooks/useUser";
import { useAuth } from "../../hooks/useAuth";

export function ClockAndProfile() {
  // User Data
  const { user } = useAuth();
  const { userData } = useUser();

  // Challenges Context
  const { level, challengesCompleted } = useContext(ChallengesContext);

  // Theme
  const { globalTheme } = useContext(ThemeContext);

  // CountdownContext
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
              <span>Level {level}</span>
            </div>
          </div>
        </div>

        <div className={styles.desafios}>
          <h2>
            Challenges Completed:{" "}
            <span className={styles[globalTheme]}>{challengesCompleted}</span>
          </h2>
        </div>

        {hasFinished ? (
          <button disabled className={`${styles.start} ${styles[globalTheme]}`}>
            <span className={styles[globalTheme]}>Challenge Time</span>
            <FiPlay size={30} />
          </button>
        ) : (
          <>
            {isActive ? (
              <button
                onClick={resertCountdown}
                className={`${styles.start} ${styles[globalTheme]}`}
              >
                <span className={styles[globalTheme]}>Stop now</span>
                <FiPlay size={30} />
              </button>
            ) : (
              <button
                onClick={startCountdown}
                className={`${styles.start} ${styles[globalTheme]}`}
              >
                <span className={styles[globalTheme]}>Start now</span>
                <FiPlay size={30} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
