import { CircleUserRoundIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router"

export default function Avatar() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" aria-label="Open account menu">
                    <CircleUserRoundIcon size={16} aria-hidden="true" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-64">
                <DropdownMenuLabel className="flex flex-col">
                    <span>Conectado como</span>
                    <span className="text-foreground text-xs font-normal">
                        Administrador
                    </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuSeparator />
                <Link to={"/"}>
                    <DropdownMenuItem>
                        Sair
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}