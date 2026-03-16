import { createContext, useContext, useState} from "react";
import { useColorScheme } from "react-native";


const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();

  const [theme, setTheme] = useState(
    systemTheme === "dark" ? "dark" : "light"
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
};