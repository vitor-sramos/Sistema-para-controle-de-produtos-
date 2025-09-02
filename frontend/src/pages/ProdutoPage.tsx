import { ButtonSearchId } from "@/components/ButtonSearchId";
import { DialogCustom } from "@/components/DialogCustom";
import { TableProdutos } from "@/components/TableProdutos";
import axios from "axios";
import { useEffect, useState } from "react";

export interface Produto {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  estoque: number;
}

export function ProdutoPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    handleSearchAll();
  }, []);

  const handleSearchAll = async () => {
    try {
      const response = await axios.get<Produto[]>(
        "http://localhost:8080/produtos"
      );
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
    }
  };

  const handleSearchId = async (id: string) => {
    try {
      if (id.trim() === "") {
        await handleSearchAll();
      } else {
        const response = await axios.get(
          `http://localhost:8080/produtos/${id}`
        );
        setProdutos([response.data]);
        setIsFiltered(true);
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      setProdutos([]);
      setIsFiltered(true);
    }
  };

  const handleBack = () => {
    handleSearchAll();
    setIsFiltered(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-4xl font-bold ">Cadastro de Produtos</h1>
      <div className="flex items-center justify-between">
        <ButtonSearchId
          onSearch={handleSearchId}
          onBack={handleBack}
          showBackButton={isFiltered}
        />
        <DialogCustom onSearchAll={handleSearchAll}/>
      </div>
      <TableProdutos produtos={produtos} onSearchAll={handleSearchAll}/>
    </div>
  );
}
