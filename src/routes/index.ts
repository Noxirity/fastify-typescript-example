import { FastifyInstance, RouteOptions, FastifyRequest, FastifyReply } from 'fastify';
import { Endpoint } from '../types/Endpoints';
import { packeter } from '../utilities/packeter';

interface Params {
    server_id: string;
}

interface Body {
    Packet: string;
}

const endpoints: Endpoint<Params, Body>[] = [
    {
        method: 'GET',
        url: '/',
        authRequired: false,
        callback: async (_request: FastifyRequest, _reply: FastifyReply) => {
            return [200, { status: "OK" }];
        },
    },
    {
        method: 'POST',
        url: '/packet/:server_id',
        authRequired: false,
        callback: async (request: FastifyRequest<{ Params: Params; Body: Body }>, reply: FastifyReply) => {
            return await packeter(request.params.server_id, JSON.parse(Buffer.from(request.body.Packet, 'base64').toString('utf-8')));
        },
    },
];

async function indexRoutes(fastify: FastifyInstance) {
    endpoints.forEach((endpoint) => {
        const routeOptions: RouteOptions = {
            method: endpoint.method,
            url: endpoint.url,
            handler: async (request: FastifyRequest, reply: FastifyReply) => {
                const [statusCode, response] = await endpoint.callback(request as FastifyRequest<{ Params: Params; Body: Body }>, reply);
                reply.code(statusCode).send(response);
            }
        };
        fastify.route(routeOptions);
    });
}

export default indexRoutes;
