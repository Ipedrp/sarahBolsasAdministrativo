import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import type { ThemeContextType } from "@/context/ThemeContext"; // importa o tipo

// Custom Hook para usar o tema
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
};
