import { FastifyRequest, FastifyReply, HTTPMethods } from 'fastify';

export interface Endpoint<
    Params = unknown,
    Body = unknown,
    Query = unknown,
    Headers = unknown
> {
    method: HTTPMethods;
    url: string;
    authRequired: boolean;
    callback: (request: FastifyRequest<{ Params: Params; Body: Body; Query?: Query; Headers?: Headers }>, reply: FastifyReply) => Promise<[status: number, data: any]>;
}
