import Fastify from "fastify";
import dotenv from "dotenv";
import indexRoute from "./routes/index";
import { getRedisConnection } from "./service/redis";

dotenv.config()

const server = Fastify();

const start = async () => {
  try {
    await server.register(indexRoute);

    await server.listen({ port: 3000 });
    console.log("Server is running on port 3000");
  } catch (error) {
    console.log("Error starting server");
    console.log(error);
    server.log.error(error);
    process.exit(1);
  }
};

start();

export default server;