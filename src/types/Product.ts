export interface Estoque {
  id: string;
  produtoId: string;
  quantidade: number;
  unidade: string;
  alertaMinimo: boolean;
  quantidadeMinima: number;
}

export interface Categoria {
  id: string;
  nome: string;
  tipo: string;
}

export interface Subcategoria {
  id: string;
  nome: string;
  categoriaId: string;
}

export interface Produto {
  id: string;
  nome: string;
  preco: number;
  descricao: string | null;
  largura: number;
  altura: number;
  peso: number | null;
  profundidade: number | null;
  emPromocao: boolean;
  precoPromocional: number | null;
  imagemInterna: string[];
  imagemExterna: string[];

  // continuam existindo (para criar produto)
  subcategoriaId: string;
  categoriaId: string;

  // novos campos vindos do backend
  categoria?: Categoria;
  subcategoria?: Subcategoria;

  estoque: Estoque;
}

