import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import type { ThemeContextType } from "@/contexts/ThemeContext"; // importa o tipo

// Custom Hook para usar o tema
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
};
