export interface Estoque {
  id: string;
  produtoId: string;
  quantidade: number;
  unidade: string;
  alertaMinimo: boolean;
  quantidadeMinima: number;
}

export interface Produto {
  id: string;
  nome: string;
  preco: number;
  descricao: string | null;
  largura: number;
  altura: number;
  peso: number;
  profundidade: number;
  emPromocao: boolean;
  precoPromocional: number | null;
  imagemInterna: string[];
  imagemExterna: string[];
  subcategoriaId: string;
  categoriaId: string;
  estoque: Estoque;
}
