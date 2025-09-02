import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import type { Produto } from "@/pages/ProdutoPage";
import { ButtonDelete } from "./ButtonDelete";
import { ButtonUpdate } from "./ButtonUpdate";

interface TableCustomProps {
  produtos: Produto[];
  onSearchAll: () => void;
}

export function TableProdutos({ produtos, onSearchAll }: TableCustomProps) {
  return (
    <div className="border rounded p-2">
      <Table>
        <TableHeader>
          <TableHead>ID</TableHead>
          <TableHead>Produto</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Descrição</TableHead>
        </TableHeader>
        <TableBody>
          {produtos.map((produto) => {
            return (
              <TableRow key={produto.id}>
                <TableCell>{produto.id}</TableCell>
                <TableCell>{produto.nome}</TableCell>
                <TableCell>R$ {produto.preco}</TableCell>
                <TableCell>{produto.descricao}</TableCell>

                <div className="mt-3 mb-3 space-x-2">
                  <ButtonDelete id={produto.id} onSearchAll={onSearchAll}/>
                  <ButtonUpdate onSearchAll={onSearchAll} produto={produto}/>
                </div>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
