import { Cards } from "@/components/card/Cards";
import { ChartColumnStacked, ScanBarcode, Images, Waypoints } from "lucide-react";
import { Link } from "react-router";
import { Notification } from "@/components/notification/Notification";
// Home.tsx
export function Initial() {
  return (
    <div>
      <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4 w-full">
        <Link to={"/produtos"}>
          <Cards title="Produtos" icon={<ScanBarcode />} />
        </Link>
        <Link to={"/categorias"}>
          <Cards title="Categorias" icon={<ChartColumnStacked />} />
        </Link>
        <Link to={"/subcategorias"}>
          <Cards title="Subcategoria" icon={<Waypoints />} />
        </Link>
        <Link to={"/imagens"}>
          <Cards title="Imagens" icon={<Images />} />
        </Link>
      </section>
      <div>
        <Notification title="teste" description="testando" close="fechar"/>
      </div>
    </div>
  );
}
