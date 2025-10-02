import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface DialogAddSubCategoryProps {
  openSubCategory: boolean;
  onOpenChange: (openSubcategory: boolean) => void;
}

export default function DialogAddSubCategory({ openSubCategory, onOpenChange }: DialogAddSubCategoryProps) {

  return (
    <Dialog open={openSubCategory} onOpenChange={onOpenChange}>
      <DialogContent className="dark:bg-gray-900">
        <div className="flex flex-col items-center gap-2">
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Adicionar Subcategoria
            </DialogTitle>
          </DialogHeader>
        </div>

        <form className="space-y-5 w-full">
          <div className="space-y-4">
            <div>
              <Label>Nome</Label>
              <Input placeholder="Escreva o nome da subcategoria  Ex: Cinto" type="text" required />
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

          <Button type="button" className="w-full bg-red-900 dark:text-white dark:hover:text-black cursor-pointer">
            Cadastrar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
