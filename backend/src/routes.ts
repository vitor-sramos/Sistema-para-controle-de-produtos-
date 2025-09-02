import type { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { ProdutoController } from './controllers/ProdutoController.js';


export async function routes( fastify: FastifyInstance, options: FastifyPluginOptions) {

    const produtoController = new ProdutoController();

    fastify.post("/produtos", async (request: FastifyRequest, reply: FastifyReply) => {
        return produtoController.create(request, reply);
    });

    fastify.get("/produtos", async (request: FastifyRequest, reply: FastifyReply) => {
        return produtoController.getAll(request, reply);
    });

    fastify.get("/produtos/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return produtoController.getById(request, reply);
    });

    fastify.put("/produtos/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return produtoController.updateById(request, reply);
    })

    fastify.delete("/produtos/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return produtoController.deleteById(request, reply);
    });
    
}