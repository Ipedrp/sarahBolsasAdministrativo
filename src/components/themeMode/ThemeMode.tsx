import { useId, useState } from "react"
import { MoonIcon, SunIcon } from "lucide-react"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function ThemeMode() {
  const id = useId()
  const [checked, setChecked] = useState<boolean>(true)

  return (
    <div className="inline-flex items-center gap-2">
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={setChecked}
        aria-label="Toggle switch"
        className={`
    data-[state=checked]:bg-red-900 
    data-[state=unchecked]:bg-gray-300
  `}
      />
      <Label htmlFor={id}>
        <span className="sr-only">Toggle switch</span>
        {checked ? (
          <SunIcon size={14} aria-hidden="true" />
        ) : (
          <MoonIcon size={14} aria-hidden="true" />
        )}
      </Label>
    </div>
  )
}
