import prisma from "../prisma/index.js";
import type ProdutoRequestDto from "../dto/ProdutoRequestDto.js";
import type ProdutoResponseDto from "../dto/ProdutoResponseDto.js"

class CreateProdutoService {
  async execute({ nome, preco, estoque, descricao } : ProdutoRequestDto) {
    
    if(!nome || !preco || !estoque || !descricao ) {
        throw new Error("Informar todos os campos")
    }

    const produto = await prisma.produto.create({
        data: {nome,preco,estoque,descricao}
    });

    const produtoResponseDto : ProdutoResponseDto = {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      estoque: produto.estoque,
      descricao: produto.descricao
    };
    
    return produtoResponseDto;
  }
}

export  {CreateProdutoService};