import type ProdutoResponseDto from "../dto/ProdutoResponseDto.js";
import prisma from "../prisma/index.js";


class DeleteByIdProdutoService {
    async execute(id: string) {
        const produto = await prisma.produto.delete({
            where: {id}
        })
        
        if(!produto) {
            throw new Error("Produto não encontrado");
        }

        const produtoResponseDto : ProdutoResponseDto = {
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            estoque: produto.estoque,
            descricao: produto.descricao
        }
        
        return produtoResponseDto;
    }
}

export { DeleteByIdProdutoService };