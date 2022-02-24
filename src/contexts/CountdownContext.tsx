import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Hooks
import { useTheme } from "../hooks/useTheme";

// Context
import { ChallengesContext } from "./ChallengesContext";

import {
  POMODORO_THEME,
  SHORT_BREAK_THEME,
  LONG_BREAK_THEME,
} from "./ThemeContext";

interface CountdwonContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resertCountdown: () => void;
  globalTimeState: string;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdwonContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const { globalTheme, setGlobalTheme } = useTheme();
  const [timeState, setTimeState] = useState<string>("pomodoro");
  const [repeatedTimes, setRepeatedTimes] = useState<number>(1);

  const [time, setTime] = useState(0.1 * 60);

  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    if (globalTheme === "pomodoro") {
      setTimeState(globalTheme);
      setGlobalTheme(globalTheme);
    } else if (globalTheme === "shortBreak") {
      setTimeState(globalTheme);
      setGlobalTheme(globalTheme);
    } else if (globalTheme === "longBreak") {
      setTimeState(globalTheme);
      setGlobalTheme(globalTheme);
    }

    setIsActive(true);
  }

  function startPomodoro() {
    setTime(0.1 * 60);
    setIsActive(true);
  }

  function startShortBreak() {
    setTime(0.2 * 60);
    setIsActive(true);
  }

  function startLongBreak() {
    setTime(0.3 * 60);
    setIsActive(true);
  }

  function resertCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setRepeatedTimes(1);
    if (globalTheme === "pomodoro") {
      setTimeState(globalTheme);
      setGlobalTheme(globalTheme);
      setTime(0.1 * 60);
    } else if (globalTheme === "shortBreak") {
      setTimeState(globalTheme);
      setGlobalTheme(globalTheme);
      setTime(5 * 60);
    } else if (globalTheme === "longBreak") {
      setTimeState(globalTheme);
      setGlobalTheme(globalTheme);
      setTime(0.3 * 60);
    }
  }

  useEffect(() => {
    if (timeState === "pomodoro") {
      if (isActive && time > 0) {
        countdownTimeout = setTimeout(() => {
          setTime(time - 1);
        }, 1000);
      } else if (isActive && time === 0) {
        setIsActive(false);
        setRepeatedTimes(repeatedTimes + 1);
        if (repeatedTimes === 3) {
          setRepeatedTimes(1);
          setTimeState(LONG_BREAK_THEME);
          setGlobalTheme(LONG_BREAK_THEME);
          startLongBreak();
        } else {
          setTimeState(SHORT_BREAK_THEME);
          setGlobalTheme(SHORT_BREAK_THEME);
          startShortBreak();
        }
        startNewChallenge();
      }
    } else if (timeState === "shortBreak") {
      if (isActive && time > 0) {
        countdownTimeout = setTimeout(() => {
          setTime(time - 1);
        }, 1000);
      } else if (isActive && time === 0) {
        setIsActive(false);
        setTimeState(POMODORO_THEME);
        setGlobalTheme(POMODORO_THEME);
        startPomodoro();
      }
    } else if (timeState === "longBreak") {
      if (isActive && time > 0) {
        countdownTimeout = setTimeout(() => {
          setTime(time - 1);
        }, 1000);
      } else if (isActive && time === 0) {
        setIsActive(false);
        setTimeState(POMODORO_THEME);
        setGlobalTheme(POMODORO_THEME);
        startPomodoro();
      }
    }
  }, [isActive, time, timeState]);

  useEffect(() => {
    setTimeState(globalTheme);

    if (globalTheme === "pomodoro") {
      clearTimeout(countdownTimeout);
      setTime(0.1 * 60);
      setIsActive(false);
    } else if (globalTheme === "shortBreak") {
      clearTimeout(countdownTimeout);
      setTime(0.2 * 60);
      setIsActive(false);
    } else if (globalTheme === "longBreak") {
      clearTimeout(countdownTimeout);
      setTime(0.3 * 60);
      setIsActive(false);
    }
  }, [globalTheme]);
  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resertCountdown,
        globalTimeState: timeState,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
