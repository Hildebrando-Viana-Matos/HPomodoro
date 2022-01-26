// React
import { useContext } from "react";

// Context
import { ThemeContext } from "../../contexts/ThemeContext";

// Styles
import styles from "./BarXp.module.scss";

export function BarXp() {
  const { globalTheme } = useContext(ThemeContext);

  return (
    <div className={styles.barXP}>
      <span>0 xp</span>
      <div className={styles.bar}>
        <div
          style={{ width: "50%" }}
          className={`${styles.ocupBar} ${styles[globalTheme]}`}
        ></div>
      </div>
      <span>600 xp</span>
    </div>
  );
}
