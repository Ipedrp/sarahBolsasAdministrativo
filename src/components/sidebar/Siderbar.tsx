import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Package, PanelBottom, Home, ChartColumnStacked, ScanBarcode, Images, Waypoints  } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import ThemeMode from "../themeMode/ThemeMode";

export function Sidebar() {
    return (
        <div className="full w-full flex-col bg-muted/40 ">

            <aside className="fixed top-0 bottom-0 left-0 z-10 hidden w-14 border-r bg-background sm:flex dark:bg-gray-900">
                <nav className="flex flex-col items-center gap-4 px-2 py-3">
                    <TooltipProvider>
                        <Link
                            to="/inicio"
                            className="flex h-9 w-9 shrink-0 items-center justify-center bg-red-900 text-primary-foreground dark:text-muted-foreground rounded-full"
                        >
                            <Package className="h-4 w-4" />
                            <span className="sr-only">Dashboard Avatar</span>
                        </Link>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to="/inicio"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center text-muted-foreground rounded-lg transition-color hover:text-red-900"
                                >
                                    <Home className="h-4 w-4" />
                                    <span className="sr-only">Início</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" >
                                Início
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to="/produtos"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center text-muted-foreground rounded-lg transition-color hover:text-red-900"
                                >
                                    <ScanBarcode className="h-4 w-4" />
                                    <span className="sr-only">Produtos</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" >
                                Produtos
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to="/categorias"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center text-muted-foreground rounded-lg transition-color hover:text-red-900"
                                >
                                    <ChartColumnStacked className="h-4 w-4" />
                                    <span className="sr-only">Categorias</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" >
                                Categorias
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to="/subcategorias"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center text-muted-foreground rounded-lg transition-color hover:text-red-900"
                                >
                                    <Waypoints className="h-4 w-4" />
                                    <span className="sr-only">Subcategorias</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" >
                                Subcategorias
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to="/imagens"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center text-muted-foreground rounded-lg transition-color hover:text-red-900"
                                >
                                    <Images className="h-4 w-4" />
                                    <span className="sr-only">imagens</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" >
                                imagens
                            </TooltipContent>
                        </Tooltip>

                    </TooltipProvider>
                </nav>
            </aside>

            <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14 ">
                <header className="sticky top-0 z-30 flex justify-between h-14 items-center px-4 border-b bg-background dark:bg-gray-900 gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden hover:cursor-pointer dark:bg-gray-900">
                                <PanelBottom className="w-5 h-5 " />
                                <span className="sr-only">Abrir | Fechar Menu</span>
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="left" className="sm:max-w-x px-4 py-2 dark:bg-gray-900">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link to={"/inicio"}
                                    className="flex h-10 w-10 bg-red-900 rounded-full text-lg items-center justify-center text-primary-foreground dark:text-muted-foreground md:text-base gap-2"
                                >
                                    <Package className="h-5 w-5 transition-all" />
                                    <span className="sr-only">Logo</span>
                                </Link>

                                <Link to={"/inicio"}
                                    className=" flex items-center gap-4 px-2.5 text-muted-foreground hover:text-red-900"
                                >
                                    <Home className="h-5 w-5 transition-all" />
                                    Início
                                </Link>

                                <Link to={"/produtos"}
                                    className=" flex items-center gap-4 px-2.5 text-muted-foreground hover:text-red-900"
                                >
                                    <ScanBarcode className="h-5 w-5 transition-all" />
                                    Produtos
                                </Link>

                                <Link to={"/categorias"}
                                    className=" flex items-center gap-4 px-2.5 text-muted-foreground hover:text-red-900"
                                >
                                    <ChartColumnStacked className="h-5 w-5 transition-all" />
                                    Categorias
                                </Link>

                                <Link to={"/subcategorias"}
                                    className=" flex items-center gap-4 px-2.5 text-muted-foreground hover:text-red-900"
                                >
                                    <Waypoints   className="h-5 w-5 transition-all" />
                                    Subcategorias
                                </Link>

                                <Link to={"/imagens"}
                                    className=" flex items-center gap-4 px-2.5 text-muted-foreground hover:text-red-900"
                                >
                                    <Images className="h-5 w-5 transition-all" />
                                    Imagens
                                </Link>

                            </nav>
                        </SheetContent>
                    </Sheet>
                    <ThemeMode />

                </header>
            </div>

        </div>

    )
}