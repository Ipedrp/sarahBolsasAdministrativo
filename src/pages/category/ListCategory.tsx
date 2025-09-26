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

// ---- Dados estáticos (apenas nome e descrição) ----
const categoriasFake = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  nome: `Categoria ${i + 1}`,
  descricao: `Descrição da categoria ${i + 1}`,
}));

// ---- Componente ----
export function ListCategory() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = categoriasFake.slice(startIndex, endIndex);
  const totalPages = Math.ceil(categoriasFake.length / itemsPerPage);
  const remainingItems =
    categoriasFake.length - endIndex > 0
      ? categoriasFake.length - endIndex
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
        <Link to={"/categorias/adicionar"}>
          <div className="flex items-center gap-1 cursor-pointer">
            <Plus size={28} className="text-muted-foreground/80 " />
            <h2>Adicionar Categoria</h2>
          </div>
        </Link>

        <div className="relative sm:w-100 w-full">
          <Input
            className="peer ps-9"
            placeholder="Digite o nome da categoria Ex: Carteira"
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
          <Table className="min-w-[500px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.nome}</TableCell>
                  <TableCell>{item.descricao}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-3">
                      <Link to={`/categorias/atualizar`}>
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
            Página {page} de <strong>{totalPages}</strong> — {remainingItems}{" "}
            itens restantes
          </span>
          <div className="flex gap-2">
            <Button
              onClick={prevPage}
              disabled={page === 1}
              className="bg-transparent text-black hover:text-blue-400 cursor-pointer hover:bg-transparent"
            >
              Anterior
            </Button>
            <Button
              onClick={nextPage}
              disabled={page === totalPages}
              className="bg-transparent text-black hover:text-blue-400 cursor-pointer hover:bg-transparent"
            >
              Próximo
            </Button>
          </div>
        </div>
      </main>
    </section>
  );
}
