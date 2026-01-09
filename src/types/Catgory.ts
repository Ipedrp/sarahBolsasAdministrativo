export type TipoCategoria = "MASCULINA" | "FEMININA";

export interface Category {
  id?: string;
  nome: string;
  tipo_categoria: TipoCategoria;
}


export interface Categoria {
  id: string;
  nome: string;
  tipo: "MASCULINA" | "FEMININA";
}

