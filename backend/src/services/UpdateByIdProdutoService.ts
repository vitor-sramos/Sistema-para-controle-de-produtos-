import type ProdutoRequestDto from "../dto/ProdutoRequestDto.js";
import type ProdutoResponseDto from "../dto/ProdutoResponseDto.js";
import prisma from "../prisma/index.js";

class UpdateByIdProdutoService {
    async execute(id: string, body: ProdutoRequestDto) {

        const produto = await prisma.produto.update({
            where: {id},
            data: body
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

export { UpdateByIdProdutoService };