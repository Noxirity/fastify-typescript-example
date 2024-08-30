import { FastifyInstance, RouteOptions } from 'fastify';
import { Endpoint } from '../types/Endpoints';

const endpoints: Endpoint[] = [
    {
        method: 'GET',
        url: '/',
        authRequired: false,
        callback: async (request, reply) => {
            return { status: "OK" };
        },
    },
];

async function indexRoutes(fastify: FastifyInstance) {
    endpoints.forEach((endpoint) => {
        const routeOptions: RouteOptions = {
            method: endpoint.method,
            url: endpoint.url,
            handler: endpoint.callback,
        };
        fastify.route(routeOptions);
    });
}

export default indexRoutes;
