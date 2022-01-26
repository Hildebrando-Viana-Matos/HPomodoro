// React
import { useContext, useState } from "react";

// Context
import {
  ThemeContext,
  POMODORO_THEME,
  SHORT_BREAK_THEME,
  LONG_BREAK_THEME,
} from "../../contexts/ThemeContext";

// Styles
import "./styles.scss";

export function ThemeButton() {
  const [stateTime, setStateTime] = useState("");
  const { setGlobalTheme } = useContext(ThemeContext);

  function handleChangeTimeState(stateName: string) {
    if (stateName === "pomodoro") {
      setStateTime("pomodoro");
      setGlobalTheme(POMODORO_THEME);
    } else if (stateName === "shortBreak") {
      setStateTime("shortBreak");
      setGlobalTheme(SHORT_BREAK_THEME);
    } else if (stateName === "longBreak") {
      setStateTime("longBreak");
      setGlobalTheme(LONG_BREAK_THEME);
    } else {
      return;
    }
  }
  return (
    <div className="changeClockState">
      <button
        onClick={() => handleChangeTimeState("pomodoro")}
        className={stateTime === "pomodoro" ? "selectedPomodoro" : ""}
      >
        Pomodoro
      </button>
      <button
        onClick={() => handleChangeTimeState("shortBreak")}
        className={stateTime === "shortBreak" ? "selectedShortBreak" : ""}
      >
        Short Break
      </button>
      <button
        onClick={() => handleChangeTimeState("longBreak")}
        className={stateTime === "longBreak" ? "selectedLongBreak" : ""}
      >
        Long Break
      </button>
    </div>
  );
}
