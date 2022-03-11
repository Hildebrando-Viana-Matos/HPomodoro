// React
import { useContext } from "react";

// Context
import {
  ThemeContext,
  POMODORO_THEME,
  SHORT_BREAK_THEME,
  LONG_BREAK_THEME,
} from "../../contexts/ThemeContext";
import { CountdownContext } from "../../contexts/CountdownContext";

// Styles
import styles from "./ThemeButton.module.scss";

export function ThemeButton() {
  const { globalTheme, setGlobalTheme } = useContext(ThemeContext);
  const { globalTimeState } = useContext(CountdownContext);

  if (globalTimeState === "pomodoro") {
    setGlobalTheme(POMODORO_THEME);
  } else if (globalTimeState === "shortBreak") {
    setGlobalTheme(SHORT_BREAK_THEME);
  } else if (globalTimeState === "longBreak") {
    setGlobalTheme(LONG_BREAK_THEME);
  }

  function handleChangeTimeState(stateName: string) {
    new Audio("/sounds/newTime.mp3").play();

    if (stateName === "pomodoro") {
      setGlobalTheme(POMODORO_THEME);
    } else if (stateName === "shortBreak") {
      setGlobalTheme(SHORT_BREAK_THEME);
    } else if (stateName === "longBreak") {
      setGlobalTheme(LONG_BREAK_THEME);
    } else {
      return;
    }
  }
  return (
    <div className={styles.changeClockState}>
      <button
        onClick={() => handleChangeTimeState("pomodoro")}
        className={globalTheme === "pomodoro" ? styles[globalTheme] : ""}
      >
        Pomodoro
      </button>
      <button
        onClick={() => handleChangeTimeState("shortBreak")}
        className={globalTheme === "shortBreak" ? styles[globalTheme] : ""}
      >
        Short Break
      </button>
      <button
        onClick={() => handleChangeTimeState("longBreak")}
        className={globalTheme === "longBreak" ? styles[globalTheme] : ""}
      >
        Long Break
      </button>
    </div>
  );
}
