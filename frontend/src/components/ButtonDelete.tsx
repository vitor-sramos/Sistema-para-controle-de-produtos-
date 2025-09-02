import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";

interface ButtonDeleteProps {
  id: string;
  onSearchAll: () => void;
}

export function ButtonDelete({ id, onSearchAll }: ButtonDeleteProps) {
  const deleteProduto = async () => {
    try {
      await axios.delete(`http://localhost:8080/produtos/${id}`);
      onSearchAll();
    } catch (error) {
      console.error("Erro ao deletar produto", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          <Trash color="#FF0000" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar produto</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja deletar este produto?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer">Cancelar</Button>
          </DialogClose>
          <DialogClose>
            <Button
              className="cursor-pointer"
              variant="destructive"
              onClick={deleteProduto}
            >
              Deletar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
