import axios from "axios";
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

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PlusCircle } from "lucide-react";
import { Label } from "./ui/label";
import React, { useState, type FormEvent } from "react";
import type { Produto } from "@/pages/ProdutoPage";

interface DialogCustomProps {
  onSearchAll: () => void;
}

export function DialogCustom({ onSearchAll }: DialogCustomProps) {
  const [produto, setProduto] = useState<Produto>({
    id: "",
    nome: "",
    preco: 0,
    estoque: 0,
    descricao: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProduto((prev) => ({
      ...prev,
      [name]: name === "preco" || name === "estoque" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/produtos",
        produto
      );

      console.log("Produto salvo com sucesso:", response.data);

      setProduto({
        id: "",
        nome: "",
        preco: 0,
        estoque: 0,
        descricao: "",
      });

      onSearchAll();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">
            <PlusCircle />
            Novo Produto
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Produto</DialogTitle>
            <DialogDescription>Criar novo produto no sistema</DialogDescription>
          </DialogHeader>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 items-center text-right gap-3">
              <Label htmlFor="nome">Produto</Label>
              <Input
                className="col-span-3"
                name="nome"
                value={produto.nome}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-4 items-center text-right gap-3">
              <Label htmlFor="preco">Preço</Label>
              <Input
                className="col-span-3"
                name="preco"
                type="number"
                min={0}
                value={produto.preco}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-4 items-center text-right gap-3">
              <Label htmlFor="estoque">Estoque</Label>
              <Input
                className="col-span-3"
                name="estoque"
                type="number"
                min={0}
                value={produto.estoque}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-4 items-center text-right gap-3">
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                className="col-span-3"
                name="descricao"
                value={produto.descricao}
                onChange={handleChange}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant={"destructive"}
                  className="cursor-pointer"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <DialogClose>
                <Button type="submit" className="cursor-pointer">
                  Salvar
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
