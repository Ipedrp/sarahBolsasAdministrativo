import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface DialogAddCategoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DialogAddCategory({ open, onOpenChange }: DialogAddCategoryProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Adicionar Categoria
            </DialogTitle>
          </DialogHeader>
        </div>

        <form className="space-y-5 w-full">
          <div className="space-y-4">
            <div>
              <Label>Nome</Label>
              <Input placeholder="Escreva o nome da categoria  Ex: Linha Masculina" type="text" required />
            </div>
            <div>
              <Label>Descrição</Label>
              <Input
                placeholder="Escreva uma descrição"
                type="text"
                required
              />
            </div>
          </div>

          <Button type="button" className="w-full bg-red-900 cursor-pointer">
            Cadastrar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
