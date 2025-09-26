"use client";

import { PencilRuler, Plus, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router";

// ---- Dados estáticos ----
const produtosFake = Array.from({ length: 23 }, (_, i) => ({
    id: i + 1,
    nome: `Produto ${i + 1}`,
    preco: (Math.random() * 100).toFixed(2),
    descricao: "Produto de teste",
    medidas: "10x20",
    promocao: i % 2 === 0 ? "Sim" : "Não",
    precoPromocao: (Math.random() * 50).toFixed(2),
    imagens: "img.jpg",
}));

// ---- Componente ----
export function ListProduct() {
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = produtosFake.slice(startIndex, endIndex);
    const totalPages = Math.ceil(produtosFake.length / itemsPerPage);
    const remainingItems =
        produtosFake.length - endIndex > 0
            ? produtosFake.length - endIndex
            : 0;

    const nextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    return (
        <section className="flex flex-col gap-6">
            {/* Header */}
            <header className="flex flex-col gap-2 bg-gray-100/20 p-2 border-2 rounded-2xl">
                <Link to={"/produtos/adicionar"}>
                    <div className="flex items-center gap-1 cursor-pointer">
                        <Plus size={28} className="text-muted-foreground/80 " />
                        <h2>Adicionar Produto</h2>
                    </div>
                </Link>

                <div className="relative sm:w-100 w-full">
                    <Input
                        className="peer ps-9"
                        placeholder="Digite o nome do produto  Ex: Carteira "
                    />
                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                        <Search size={20} aria-hidden="true" />
                    </div>
                </div>
            </header>

            {/* Tabela */}
            <main className="bg-gray-100/20 p-2 border-2 rounded-2xl">
                {/* --- wrapper scroll horizontal --- */}
                <div className="w-full overflow-x-auto">
                    <Table className="min-w-[800px]"> {/* largura mínima para scroll */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Nome</TableHead>
                                <TableHead>Preço</TableHead>
                                <TableHead>Descrição</TableHead>
                                <TableHead>Medidas</TableHead>
                                <TableHead>Promoção</TableHead>
                                <TableHead>Preço Promoção</TableHead>
                                <TableHead>Imagens</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.nome}</TableCell>
                                    <TableCell>R$ {item.preco}</TableCell>
                                    <TableCell>{item.descricao}</TableCell>
                                    <TableCell>{item.medidas}</TableCell>
                                    <TableCell>{item.promocao}</TableCell>
                                    <TableCell>R$ {item.precoPromocao}</TableCell>
                                    <TableCell>{item.imagens}</TableCell>
                                    <TableCell className="text-right ">
                                        <div className="flex justify-end gap-3">
                                            <Link to={"/produtos/atualizar"}>
                                                <PencilRuler
                                                    size={20}
                                                    className="text-yellow-700 cursor-pointer"
                                                />
                                            </Link>
                                            <Trash2
                                                size={20}
                                                className="text-red-800 cursor-pointer"
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Paginação */}
                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm">
                        Página {page} de <strong>{totalPages}</strong> —{" "}
                        {remainingItems} itens restantes
                    </span>
                    <div className="flex gap-2">
                        <Button
                            onClick={prevPage}
                            disabled={page === 1}
                            className="bg-transparent text-black hover:text-blue-400 cursor-pointer hover:bg-transparent "
                        >
                            Anterior
                        </Button>
                        <Button
                            onClick={nextPage}
                            disabled={page === totalPages}
                            className="bg-transparent text-black hover:text-blue-400 cursor-pointer hover:bg-transparent "
                        >
                            Próximo
                        </Button>
                    </div>
                </div>
            </main>
        </section>
    );
}
