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

export interface UpdateProdutoPayload {
  nome: string;
  preco: number;
  largura: number;
  altura: number;
  emPromocao: boolean;
  estoque: number;
  quantidade_minima_estoque: number;
  alertar_estoque: boolean;
  unidade_medida: string;
  id_categoria: string;
  id_subcategoria: string;

  descricao?: string;
  peso?: number | null;
  profundidade?: number | null;
  precoPromocional?: number | null;

  img_externa_nova?: File | null;
  img_interna_nova?: File | null;

  imgs_removidas_extenas?: string[];
  imgs_removidas_internas?: string[];
}

