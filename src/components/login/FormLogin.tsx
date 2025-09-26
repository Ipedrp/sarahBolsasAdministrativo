import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { Link } from "react-router"

export function LoginForm() {

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = () => setIsVisible((prevState) => !prevState)


    return (
        <form className={cn("flex flex-col gap-6")}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Entre em sua conta</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Administrativo
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Senha</Label>
                        <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Esqueceu sua senha ?
                        </a>
                    </div>
                    <div>
                        <div className="relative">
                            <Input
                                className="pe-9"
                                placeholder="Password"
                                type={isVisible ? "text" : "password"}
                            />
                            <button
                                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                type="button"
                                onClick={toggleVisibility}
                                aria-label={isVisible ? "Hide password" : "Show password"}
                                aria-pressed={isVisible}
                                aria-controls="password"
                            >
                                {isVisible ? (
                                    <EyeOffIcon size={16} aria-hidden="true" />
                                ) : (
                                    <EyeIcon size={16} aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <Link to={"/inicio"}>
                    <Button type="submit" className="w-full bg-red-800 hover:cursor-pointer">
                        Entrar
                    </Button>
                </Link>
            </div>
        </form>
    )
}