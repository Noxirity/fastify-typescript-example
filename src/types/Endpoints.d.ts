import { FastifyRequest, FastifyReply, HTTPMethods } from 'fastify';

export interface Endpoint {
    method: HTTPMethods;
    url: string;
    authRequired: boolean;
    callback: (request: FastifyRequest, reply: FastifyReply) => Promise<any>;
}
