// React
import { useContext } from "react";
import { CountdownContext } from "../../contexts/CountdownContext";

// Context
import {
  ThemeContext,
  POMODORO_THEME,
  SHORT_BREAK_THEME,
  LONG_BREAK_THEME,
} from "../../contexts/ThemeContext";

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
    if (stateName === "pomodoro") {
      // handleChangeTimeStateValue(POMODORO_THEME);
      setGlobalTheme(POMODORO_THEME);
    } else if (stateName === "shortBreak") {
      // handleChangeTimeStateValue(SHORT_BREAK_THEME);
      setGlobalTheme(SHORT_BREAK_THEME);
    } else if (stateName === "longBreak") {
      // handleChangeTimeStateValue(LONG_BREAK_THEME);
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
