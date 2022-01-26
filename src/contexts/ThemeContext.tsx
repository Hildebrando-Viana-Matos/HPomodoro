import React, { createContext, ReactNode, useState } from "react";

export const POMODORO_THEME = "pomodoro";
export const SHORT_BREAK_THEME = "shortBreak";
export const LONG_BREAK_THEME = "longBreak";

type ThemeContextProps = {
  globalTheme: string;
  setGlobalTheme: any;
};

type ThemeContextProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext({
  globalTheme: "",
  setGlobalTheme: () => {},
} as ThemeContextProps);

const ThemeContextParent = (props: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState(POMODORO_THEME);

  const valueTheme = {
    globalTheme: theme,
    setGlobalTheme: setTheme,
  };

  return (
    <ThemeContext.Provider value={valueTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextParent;
