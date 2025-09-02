import type ProdutoResponseDto from "../dto/ProdutoResponseDto.js";
import prisma from "../prisma/index.js";

class GetAllProdutosService {
  async execute() {
    const produtos = await prisma.produto.findMany();
    
    const produtoResponseDto : ProdutoResponseDto[] = produtos.map((produto) => ({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      estoque: produto.estoque,
      descricao: produto.descricao,
    }));

    return produtoResponseDto;
  }
}

export {GetAllProdutosService};