import Fastify from "fastify";
import indexRoute from "./routes/index";

const server = Fastify({ logger: true });

const start = async () => {
  try {
    await server.register(indexRoute);

    await server.listen({ port: 3000 });
    console.log("Server is running on port 3000");
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();