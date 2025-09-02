import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes.js";

const PORT = process.env.PORT;
const app = Fastify({ logger: true });

const start = async () => {
  await app.register(cors, {
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});
  await app.register(routes);

  try {
    await app.listen({ port: Number(PORT) });
  } catch (error) {
    process.exit(1);
  }
};

start();