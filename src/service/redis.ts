import { createClient, RedisClientType } from "redis";

let client: RedisClientType;

async function initialize(): Promise<void> {
    client = createClient({
        url: "redis://172.17.0.4:6379",
        password: process.env.REDIS_PASSWORD,
        socket: {
            host: "172.17.0.4",
            port: 6379,
            tls: false
        },
        database: 0,
        commandsQueueMaxLength: 1000
    })

    client.on("error", (error) => {
        console.error('Redis Client Error:', error);
    });

    await client.connect()
}

export async function getRedisConnection(): Promise<RedisClientType> {
    if (!client) {
        await initialize();
    }

    return client;
}