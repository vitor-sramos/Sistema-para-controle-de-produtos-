import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import type { Produto } from "@/pages/ProdutoPage";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useState, type FormEvent } from "react";
import axios from "axios";

interface ButtonUpdateProps {
  produto: Produto;
  onSearchAll: () => void;
}

export function ButtonUpdate({ onSearchAll, produto }: ButtonUpdateProps) {
  const [produtoUpdate, setProdutoUpdate] = useState<Produto>(produto);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProdutoUpdate((prev) => ({
      ...prev,
      [name]: name === "preco" || name === "estoque" ? Number(value) : value,
    }));
  };

  const produtoRequest = {
    nome: produtoUpdate.nome,
    preco: produtoUpdate.preco,
    estoque: produtoUpdate.estoque,
    descricao: produtoUpdate.descricao,
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8080/produtos/${produtoUpdate.id}`,
        produtoRequest
      );

      console.log("Produto salvo com sucesso:", response.data);

      onSearchAll();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="cursor-pointer" variant="outline">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar produto</DialogTitle>
          <DialogDescription>id: {produtoUpdate.id}</DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit} id="update-form">
          <div className="grid grid-cols-4 items-center  gap-3">
            <Label htmlFor="nome">Produto</Label>
            <Input
              className="col-span-3"
              name="nome"
              value={produtoUpdate.nome}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-4 items-center  gap-3">
            <Label htmlFor="preco">Preço</Label>
            <Input
              className="col-span-3"
              name="preco"
              type="number"
              min={0}
              value={produtoUpdate.preco}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-4 items-center  gap-3">
            <Label htmlFor="estoque">Estoque</Label>
            <Input
              className="col-span-3"
              name="estoque"
              type="number"
              min={0}
              value={produtoUpdate.estoque}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-4 items-center  gap-3">
            <Label htmlFor="descricao">Descrição</Label>
            <Input
              className="col-span-3"
              name="descricao"
              value={produtoUpdate.descricao}
              onChange={handleChange}
            />
          </div>
        </form>
        <DialogFooter className="mt-2.5">
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="destructive">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose>
            <Button className="cursor-pointer" type="submit" form="update-form">
              Editar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
