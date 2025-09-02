import type { FastifyReply, FastifyRequest } from "fastify";
import type ProdutoRequestDto from "../dto/ProdutoRequestDto.js";
import { CreateProdutoService } from "../services/CreateProdutoService.js";
import { GetAllProdutosService } from "../services/GetAllProdutoService.js";
import { GetByIdProdutosService } from "../services/GetByIdProdutoService.js";
import { DeleteByIdProdutoService } from "../services/DeleteByIdProdutoService.js";
import { UpdateByIdProdutoService } from "../services/UpdateByIdProdutoService.js";

class ProdutoController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as ProdutoRequestDto;
    const produtoService = new CreateProdutoService();

    try {
      const produto = await produtoService.execute(body);
      reply.status(201).send(produto);
    } catch (err: any) {
      reply.status(400).send({
        statusCode: 400,
        error: "Bad Request",
        message: err.message,
      });
    }
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const produtoService = new GetAllProdutosService();

    try {
      const produtos = await produtoService.execute();
      reply.status(200).send(produtos);
    } catch (err: any) {
      reply.status(400).send({
        statusCode: 400,
        error: "Bad Request",
        message: err.message,
      });
    }
  }

  async getById(
    request: FastifyRequest<{ Params: { id?: string } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    if (!id) {
      return reply.status(400).send({
        statusCode: 400,
        error: "Bad Request",
        message: "ID do produto é obrigatório",
      });
    }
    const produtoService = new GetByIdProdutosService();

    try {
      const produto = await produtoService.execute(id);
      reply.status(200).send(produto);
    } catch (err: any) {
      reply.status(404).send({
        statusCode: 404,
        error: "Not Found",
        message: err.message,
      });
    }
  }

  async updateById(
    request: FastifyRequest<{ Params: { id?: string } }>,
    reply: FastifyReply
  ) {

    const {id} = request.params;
    const body = request.body as ProdutoRequestDto;

    if (!id) {
      return reply.status(400).send({
        statusCode: 400,
        error: "Bad Request",
        message: "ID do produto é obrigatório",
      });
    }

    const produtoService = new UpdateByIdProdutoService();

    try {
    const produto = await produtoService.execute(id, body);
    reply.status(200).send(produto);
  } catch (err: any) {
    if (err.code === "P2025") {
      reply.status(404).send({ message: "Produto não encontrado" });
    } else {
      reply.status(400).send({ message: err.message });
    }
  }
  }

  async deleteById(
    request: FastifyRequest<{ Params: { id?: string } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;

    if (!id) {
      return reply.status(400).send({
        statusCode: 400,
        error: "Bad Request",
        message: "ID do produto é obrigatório",
      });
    }

    const produtoService = new DeleteByIdProdutoService();

    try {
      produtoService.execute(id);
      console.log(id)
      reply.status(204);
    } catch (err: any) {
      if (err.code === "P2025") {
      reply.status(404).send({ message: "Produto não encontrado" });
    } else {
      reply.status(400).send({ message: err.message });
    }
    }
  }
}

export { ProdutoController };