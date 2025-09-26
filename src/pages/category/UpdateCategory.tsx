import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function UpdateCategory() {
    return (
        < section className="flex flex-col gap-2 bg-gray-100/20 p-2 border-2 rounded-2xl">
            {/* Header */}
            <header >
                <div className="flex items-center justify-between gap-1 cursor-pointer">
                    <Link to={"/categorias"}>
                        <ArrowLeft size={22} className="text-muted-foreground/80" />
                    </Link>
                </div>

                <div className="w-full mb-3">
                    <h1 className="text-center font-medium text-xl">Atualizar Categoria</h1>
                </div>
            </header>

            <main className="sm:w-[35%] w-full mx-auto mb-3">
                <form className="space-y-5 w-full">
                    <div className="space-y-4">
                        <div>
                            <Label>Nome</Label>
                            <Input placeholder="Escreva o nome da categoria  Ex: Linha Masculina" type="text" required />
                        </div>
                        <div>
                            <Label>Descrição</Label>
                            <Input
                                placeholder="Escreva uma descrição"
                                type="text"
                                required
                            />
                        </div>
                    </div>

                    <Button type="button" className="w-full bg-red-900 cursor-pointer">
                        Cadastrar
                    </Button>
                </form>
            </main>

        </section >
    )
}