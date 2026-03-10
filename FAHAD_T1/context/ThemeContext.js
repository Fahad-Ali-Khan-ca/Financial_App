import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

const lightTheme = {
  dark: false,
  background: "#f5f5f5",
  card: "#fff",
  text: "#222",
  textSecondary: "#666",
  textMuted: "#999",
  border: "#eee",
  inputBg: "#fff",
  inputBorder: "#ddd",
  primary: "#1976d2",
  positive: "#2e7d32",
  negative: "#c62828",
  filterBg: "#e0e0e0",
  tabBar: "#fff",
};

const darkTheme = {
  dark: true,
  background: "#121212",
  card: "#1e1e1e",
  text: "#e0e0e0",
  textSecondary: "#aaa",
  textMuted: "#777",
  border: "#333",
  inputBg: "#2a2a2a",
  inputBorder: "#444",
  primary: "#64b5f6",
  positive: "#66bb6a",
  negative: "#ef5350",
  filterBg: "#333",
  tabBar: "#1e1e1e",
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
