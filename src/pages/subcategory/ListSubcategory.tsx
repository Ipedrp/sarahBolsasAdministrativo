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
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSubCategoria } from "@/contexts/SubcategoryContext";
import { useCategoria } from "@/contexts/CategoryContext";
import { Sucess } from "@/components/notification/Sucess";
import { Error } from "@/components/notification/Error";

// ---- Dados estáticos (apenas nome e descrição) ----
// const categoriasFake = Array.from({ length: 23 }, (_, i) => ({
//   id: i + 1,
//   nome: `Subcategoria ${i + 1}`,
//   descricao: `Descrição da subcategoria ${i + 1}`,
// }));

// ---- Componente ----
export function ListSubcategory() {

  const { getAllSubCategorias, loading, subCategorias, deletarSubCategoria, errorMessage, clearError } = useSubCategoria();
  const { getAllCategorias, categorias } = useCategoria();

  const [successOpen, setSuccessOpen] = useState(false);

  const [search, setSearch] = useState("");

  const filteredSubCategorias = subCategorias.filter((sub) =>
    sub.nome.toLowerCase().includes(search.toLowerCase())
  );



  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = filteredSubCategorias.slice(startIndex, endIndex);

  const totalPages = Math.ceil(
    filteredSubCategorias.length / itemsPerPage
  );

  const remainingItems =
    filteredSubCategorias.length - endIndex > 0
      ? filteredSubCategorias.length - endIndex
      : 0;


  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  useEffect(() => {
    getAllSubCategorias();
    getAllCategorias();
  }, []);

  const categoriaMap = categorias.reduce((acc, cat) => {
    acc[cat.id] = cat.nome;
    return acc;
  }, {} as Record<string, string>);


  // useEffect(() => {
  //   if (id) {
  //     getCategoriaById(id);
  //   }
  // }, [id]);

  async function handleDelete(id: string) {
    try {
      clearError(); // limpa erro anterior

      await deletarSubCategoria(id);

      setSuccessOpen(true);

    } catch {
      // erro tratado no contexto
    }
  }


  return (
    <section className="flex flex-col gap-6">
      {/* Header */}
      <header className="flex flex-col gap-2 bg-gray-100/20 p-2 border-2 rounded-2xl">
        <Link to={"/subcategorias/adicionar"}>
          <div className="flex items-center gap-1 cursor-pointer">
            <Plus size={28} className="text-muted-foreground/80 " />
            <h2>Adicionar Subcategoria</h2>
          </div>
        </Link>

        <div className="relative sm:w-100 w-full">
          <Input
            className="peer ps-9"
            placeholder="Digite o nome da subcategoria Ex: Carteira"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // volta pra página 1 ao pesquisar
            }}
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
                <TableHead>Tipo de Categoria</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.nome}</TableCell>
                  <TableCell>
                    {categoriaMap[item.categoriaId] || "Categoria não encontrada"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-3">
                      <Link to={`/subcategorias/atualizar/${item.id}`}>
                        <PencilRuler
                          size={20}
                          className="text-yellow-700 dark:text-yellow-400 cursor-pointer"
                        />
                      </Link>
                      <button onClick={() => handleDelete(item.id)} disabled={loading}>
                        <Trash2
                          size={20}
                          className="text-red-800 dark:text-red-600 cursor-pointer"
                        />
                      </button>
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
              className="bg-transparent text-black dark:text-white hover:text-blue-400 cursor-pointer hover:bg-transparent"
            >
              Anterior
            </Button>
            <Button
              onClick={nextPage}
              disabled={page === totalPages}
              className="bg-transparent text-black dark:text-white hover:text-blue-400 cursor-pointer hover:bg-transparent"
            >
              Próximo
            </Button>
          </div>
        </div>

        <Sucess
          active={successOpen}
          onClose={() => setSuccessOpen(false)}
          text="Subcategoria excluída com sucesso!"
        />

        <Error
          active={!!errorMessage}
          onClose={clearError}
          text={errorMessage ?? ""}
        />
      </main>
    </section>
  );
}
