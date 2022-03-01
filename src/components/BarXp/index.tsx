// React
import { useContext } from "react";

// Context
import { ChallengesContext } from "../../contexts/ChallengesContext";
import { ThemeContext } from "../../contexts/ThemeContext";

// Styles
import styles from "./BarXp.module.scss";

export function BarXp() {
  const { globalTheme } = useContext(ThemeContext);
  const { currentExperience, experienceToNextLevel } =
    useContext(ChallengesContext);

  const percentToNextLevel =
    Math.round(currentExperience * 100) / experienceToNextLevel;

  return (
    <div className={styles.barXP}>
      <span>0 xp</span>
      <div className={styles.bar}>
        <div
          style={{ width: `${percentToNextLevel}%` }}
          className={`${styles.ocupBar} ${styles[globalTheme]}`}
        ></div>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </div>
  );
}
