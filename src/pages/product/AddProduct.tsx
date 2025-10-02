import { useEffect, useId, useRef, useState } from "react"
import DialogAddCategory from "@/components/dialog/DialogAddCategory";
import { ArrowLeft, ChartColumnStacked, Waypoints } from "lucide-react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import DialogAddSubCategory from "@/components/dialog/DialogAddSubCategory";


export function AddProduct() {

    const [open, setOpen] = useState(false);
    const [openSubcategory, setOpenSubcategory] = useState(false);

    const radioId = useId()
    const inputId = useId()
    const [selectedValue, setSelectedValue] = useState("without-expansion")
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (selectedValue === "with-expansion" && inputRef.current) {
            inputRef.current.focus()
        }
    }, [selectedValue])


    return (
        <section className="flex flex-col gap-2 bg-gray-100/20 p-2 border-2 rounded-2xl">
            {/* Header */}
            <header >
                <div className="flex items-center justify-between gap-1 cursor-pointer">
                    <Link to={"/produtos"}>
                        <ArrowLeft size={22} className="text-muted-foreground/80" />
                    </Link>

                    {/* Ícone que abre o Dialog */}
                    <div className="flex flex-row gap-2">
                        <ChartColumnStacked
                            size={22}
                            className="text-muted-foreground/80 cursor-pointer"
                            onClick={() => setOpen(true)}
                        />

                        <Waypoints
                            size={22}
                            className="text-muted-foreground/80 cursor-pointer"
                            onClick={() => setOpenSubcategory(true)}
                        />
                    </div>
                </div>


                <div className="w-full mb-3">
                    <h1 className="text-center font-medium text-xl">Adicionar Produtos</h1>
                </div>
            </header>

            <main className="sm:w-[35%] w-full mx-auto">
                <form className="space-y-5 w-full">
                    <div className="space-y-4">
                        <div className="flex sm:flex-row flex-col gap-3">
                            <div className="flex-1">
                                <Label>Nome</Label>
                                <Input placeholder="Ex: Cinto" type="text" required />
                            </div>
                            <div>
                                <Label>Preço</Label>
                                <div className="flex rounded-md shadow-xs">
                                    <span className="border-input bg-background text-muted-foreground -z-10 inline-flex items-center rounded-s-md border px-3 text-sm">
                                        R$
                                    </span>
                                    <Input
                                        className="-ms-px rounded-s-none shadow-none"
                                        placeholder="0.00"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-3">
                            <div className="flex-1">
                                <Label>Largura - cm</Label>
                                <Input placeholder="Ex: 23" type="number" required />
                            </div>
                            <div className="flex-1">
                                <Label>Altura - cm</Label>
                                <Input placeholder="Ex: 15" type="number" required />
                            </div>
                        </div>
                        <div className="*:not-first:mt-2">
                            <Label>Imagem interna</Label>
                            <Input
                                className="p-0 pe-3 file:me-3 file:border-0 file:border-e"
                                type="file"
                            />
                        </div>
                        <div className="*:not-first:mt-2">
                            <Label>Imagem externa</Label>
                            <Input
                                className="p-0 pe-3 file:me-3 file:border-0 file:border-e"
                                type="file"
                            />
                        </div>
                        <div className="*:not-first:mt-2">
                            <Label>Descrição</Label>
                            <Textarea placeholder="Escreva uma pequena descrição do produto" />
                        </div>

                        <RadioGroup
                            className="gap-6"
                            value={selectedValue}
                            onValueChange={setSelectedValue}
                        >
                            <div>
                                <div className="flex items-start gap-2">
                                    <RadioGroupItem
                                        value="with-expansion"
                                        id={`${radioId}-1`}
                                        aria-describedby={`${radioId}-1-description`}
                                        aria-controls={inputId}
                                    />
                                    <div className="grow">
                                        <div className="grid grow gap-2">
                                            <Label htmlFor={`${radioId}-1`}>Promoção</Label>
                                            <p
                                                id={`${radioId}-1-description`}
                                                className="text-muted-foreground text-xs"
                                            >
                                                Este produto será incluido em promoção
                                            </p>
                                        </div>
                                        {/* Expandable field */}
                                        <div
                                            role="region"
                                            id={inputId}
                                            aria-labelledby={`${radioId}-1`}
                                            className="grid transition-all ease-in-out data-[state=collapsed]:grid-rows-[0fr] data-[state=collapsed]:opacity-0 data-[state=expanded]:grid-rows-[1fr] data-[state=expanded]:opacity-100"
                                            data-state={
                                                selectedValue === "with-expansion" ? "expanded" : "collapsed"
                                            }
                                        >
                                            <div className="pointer-events-none -m-2 overflow-hidden p-2">
                                                <div className="pointer-events-auto mt-3 relative">
                                                    <Label>Preço com promoção</Label>
                                                    <div className="flex rounded-md shadow-xs">
                                                        <span className="border-input bg-background text-muted-foreground -z-10 inline-flex items-center rounded-s-md border px-3 text-sm">
                                                            R$
                                                        </span>
                                                        <Input
                                                            ref={inputRef}
                                                            type="text"
                                                            id="radio-05-additional-info"
                                                            placeholder="0.00"
                                                            aria-label="Additional Information"
                                                            disabled={selectedValue !== "with-expansion"}
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <RadioGroupItem
                                    value="without-expansion"
                                    id={`${radioId}-2`}
                                    aria-describedby={`${radioId}-2-description`}
                                />
                                <div className="grid grow gap-2">
                                    <Label htmlFor={`${radioId}-2`}>Sem promoção</Label>
                                    <p
                                        id={`${radioId}-2-description`}
                                        className="text-muted-foreground text-xs"
                                    >
                                        Este produto não será incluido em promoção
                                    </p>
                                </div>
                            </div>
                        </RadioGroup>
                    </div>

                    <Button type="button" className="w-full bg-red-900 dark:text-white dark:hover:text-black cursor-pointer ">
                        Cadastrar
                    </Button>
                </form>
            </main >
            {/* Componente Dialog separado */}
            < DialogAddCategory open={open} onOpenChange={setOpen} />
            < DialogAddSubCategory openSubCategory={openSubcategory} onOpenChange={setOpenSubcategory} />
        </section >
    )
}