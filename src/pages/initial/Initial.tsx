import { Cards } from "@/components/card/Cards";
import { ChartColumnStacked, ScanBarcode, Images, Waypoints } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react"
import { Sucess } from "@/components/notification/Sucess";
import { Error } from "@/components/notification/Error";

export function Initial() {

  const [showNotification, setShowNotification] = useState(false)
  const [showNotificationError, setShowNotificationError] = useState(false)

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

      {/* ativar o button para parecer a notificação */}
      <div>
        <button onClick={() => setShowNotification(true)}>Mostrar Sucess notificação</button>
        <Sucess
          active={showNotification}
          onClose={() => setShowNotification(false)}
          text={"Sucess"}
        />
      </div>

      {/* ativar o button para parecer a notificação */}
      <div>
        <button onClick={() => setShowNotificationError(true)}>Mostrar Error notificação</button>
        <Error
          active={showNotificationError}
          onClose={() => setShowNotificationError(false)}
          text={"Error"}
        />
      </div>
    </div>
  )
}
