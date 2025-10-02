import { useId } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/useTheme"; // ajusta o caminho se necessário

export default function ThemeMode() {
  const id = useId();
  const { theme, toggleTheme } = useTheme();

  const checked = theme === "light";

  return (
    <div className="inline-flex items-center gap-2">
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={toggleTheme}
        aria-label="Toggle switch"
        className={`
          data-[state=checked]:bg-red-900 
          data-[state=unchecked]:bg-gray-400
          dark:data-[state=checked]:bg-blue-600 
          dark:data-[state=unchecked]:bg-gray-700

          [&>span]:bg-white       /* bolinha branca no modo claro */
          dark:[&>span]:bg-white   /* bolinha vermelha no modo escuro */
        `}
      />
      <Label htmlFor={id}>
        <span className="sr-only">Toggle switch</span>
        {checked ? (
          <SunIcon size={16}ria-hidden="true" />
        ) : (
          <MoonIcon size={16} className="dark:text-blue-00" aria-hidden="true" />
        )}
      </Label>
    </div>
  );
}
