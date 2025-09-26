import Avatar from "../avatar/Avatar"
import ThemeMode from "../themeMode/ThemeMode"
import { Separator } from "@/components/ui/separator"

export function Header() {
  return (
    <header className="hidden sm:flex sm:ml-14 p-4 justify-between items-center bg-background border-b">
      <h1 className="font-semibold">SARAH BOLSAS</h1>
      <div className="flex h-5 items-center space-x-4 text-sm">
        <ThemeMode />
        <Separator orientation="vertical" />
        <Avatar />
      </div>
    </header>
  )
}
