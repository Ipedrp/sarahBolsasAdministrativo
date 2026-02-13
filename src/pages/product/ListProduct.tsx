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
import { useProduct } from "@/contexts/ProductContext";
import { useEffect } from "react";


// ---- Dados estáticos ----
// const produtosFake = Array.from({ length: 23 }, (_, i) => ({
//     id: i + 1,
//     nome: `Produto ${i + 1}`,
//     preco: (Math.random() * 100).toFixed(2),
//     descricao: "Produto de teste",
//     medidas: "10x20",
//     promocao: i % 2 === 0 ? "Sim" : "Não",
//     precoPromocao: (Math.random() * 50).toFixed(2),
//     imagens: "img.jpg",
// }));

// ---- Componente ----
export function ListProduct() {

    const { produtos, listarProdutos, deletarProduto, loading, errorMessage } = useProduct();

    const [search, setSearch] = useState("");

    const filteredProdutos = produtos.filter((prod) =>
        prod.nome.toLowerCase().includes(search.toLowerCase())
    );

    const [page, setPage] = useState(1);

    const itemsPerPage = 5;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = filteredProdutos.slice(startIndex, endIndex);

    const totalPages = Math.ceil(
        filteredProdutos.length / itemsPerPage
    );

    const remainingItems =
        filteredProdutos.length - endIndex > 0
            ? filteredProdutos.length - endIndex
            : 0;



    const nextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    async function handleDelete(id: string) {
        try {
            await deletarProduto(id);
        } catch {
            // erro já tratado no contexto
        }
    }

    useEffect(() => {
        listarProdutos();
    }, []);


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
                        placeholder="Digite o nome do produto Ex: Carteira"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1); // volta para página 1 ao pesquisar
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
                    <Table className="min-w-[800px]"> {/* largura mínima para scroll */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Nome</TableHead>
                                <TableHead>Preço</TableHead>
                                <TableHead>Categoria</TableHead>
                                <TableHead>Subcategoria</TableHead>
                                <TableHead>Medidas</TableHead>
                                <TableHead>Promoção</TableHead>
                                <TableHead>Preço Promoção</TableHead>
                                <TableHead>Imagens</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading && (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center">
                                        Carregando...
                                    </TableCell>
                                </TableRow>
                            )}

                            {errorMessage && (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center text-red-500">
                                        {errorMessage}
                                    </TableCell>
                                </TableRow>
                            )}

                            {!loading &&
                                !errorMessage &&
                                currentItems.map((item) => (
                                    <TableRow key={item.id}>
                                        {/* Nome */}
                                        <TableCell className="font-medium">
                                            {item.nome}
                                        </TableCell>

                                        {/* Preço */}
                                        <TableCell>
                                            R$ {item.preco.toFixed(2)}
                                        </TableCell>

                                        {/* Categoria */}
                                        <TableCell className="max-w-[225px] truncate">
                                            {item.categoriaId}
                                        </TableCell>

                                        {/* Subcategoria */}
                                        <TableCell className="max-w-[225px] truncate">
                                            {item.subcategoriaId}
                                        </TableCell>

                                        {/* Medidas */}
                                        <TableCell>
                                            {item.largura}x{item.altura}
                                        </TableCell>

                                        {/* Promoção */}
                                        <TableCell>
                                            {item.emPromocao ? "Sim" : "Não"}
                                        </TableCell>

                                        {/* Preço Promo */}
                                        <TableCell>
                                            {item.precoPromocional
                                                ? `R$ ${item.precoPromocional.toFixed(2)}`
                                                : "-"}
                                        </TableCell>

                                        {/* Imagem */}
                                        <TableCell>
                                            {item.imagemExterna?.length > 0 ? (
                                                <img
                                                    src={item.imagemExterna[0]}
                                                    alt={item.nome}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                            ) : (
                                                "Sem imagem"
                                            )}
                                        </TableCell>

                                        {/* Ações */}
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-3">
                                                <Link to={`/produtos/atualizar/${item.id}`}>
                                                    <PencilRuler
                                                        size={20}
                                                        className="text-yellow-700 cursor-pointer"
                                                    />
                                                </Link>

                                                <button onClick={() => handleDelete(item.id)}>
                                                    <Trash2
                                                        size={20}
                                                        className="text-red-800 cursor-pointer"
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
                        Página {page} de <strong>{totalPages}</strong> —{" "}
                        {remainingItems} itens restantes
                    </span>
                    <div className="flex gap-2">
                        <Button
                            onClick={prevPage}
                            disabled={page === 1}
                            className="bg-transparent text-black dark:text-white hover:text-blue-400 cursor-pointer hover:bg-transparent "
                        >
                            Anterior
                        </Button>
                        <Button
                            onClick={nextPage}
                            disabled={page === totalPages}
                            className="bg-transparent text-black dark:text-white hover:text-blue-400 cursor-pointer hover:bg-transparent "
                        >
                            Próximo
                        </Button>
                    </div>
                </div>
            </main>
        </section>
    );
}
