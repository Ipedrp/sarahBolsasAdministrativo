export type TipoCategoria = "MASCULINA" | "FEMININA";

export interface Category {
  id?: string;
  nome: string;
  tipo_categoria: TipoCategoria;
}
