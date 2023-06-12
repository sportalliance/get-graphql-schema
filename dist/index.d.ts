#!/usr/bin/env node
import * as meow from 'meow';
/**
 *
 * Normalizes header input from CLI
 *
 * @param cli
 */
export declare function getHeadersFromInput(cli: meow.Result): {
    key: string;
    value: string;
}[];
interface Options {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: {
        [key: string]: string;
    };
    json?: boolean;
    fromJson?: boolean;
}
/**
 *
 * Fetch remote schema and turn it into string
 *
 * @param endpoint
 * @param options
 */
export declare function getRemoteSchema(endpoint: string, options: Options): Promise<{
    status: 'ok';
    schema: string;
} | {
    status: 'err';
    message: string;
}>;
/**
 *
 * Prints schema to file.
 *
 * @param dist
 * @param schema
 */
export declare function printToFile(dist: string, schema: string): {
    status: 'ok';
    path: string;
} | {
    status: 'err';
    message: string;
};
export {};
