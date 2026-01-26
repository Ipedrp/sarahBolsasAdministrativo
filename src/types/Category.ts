export type TipoCategoria = "MASCULINA" | "FEMININA";

export interface Categoria {
  id: string;
  nome: string;
  tipo: TipoCategoria;
}
