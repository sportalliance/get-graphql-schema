import fetch from 'node-fetch'
import * as fs from 'fs'
import * as path from 'path'
import * as  meow from 'meow'
import * as mkdirp from 'mkdirp'
import { IntrospectionQuery, introspectionQuery } from 'graphql/utilities/introspectionQuery'
import { buildClientSchema } from 'graphql/utilities/buildClientSchema'
import { printSchema } from 'graphql/utilities/schemaPrinter'
import * as query from 'querystringify'

/**
 *
 * Normalizes header input from CLI
 *
 * @param cli
 */
export function getHeadersFromInput(
  cli: meow.Result,
): { key: string; value: string }[] {
  switch (typeof cli.flags.header) {
    case 'string': {
      const keys = query.parse(cli.flags.header)
      const key = Object.keys(keys)[0]
      return [{ key: key, value: keys[key] }]
    }
    case 'object': {
      return cli.flags.header.map(header => {
        const keys = query.parse(header)
        const key = Object.keys(keys)[0]
        return { key: key, value: keys[key] }
      })
    }
    default: {
      return []
    }
  }
}

interface Options {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: { [key: string]: string }
  json?: boolean
  fromJson?: boolean
}

/**
 *
 * Fetch remote schema and turn it into string
 *
 * @param endpoint
 * @param options
 */
export async function getRemoteSchema(
  endpoint: string,
  options: Options,
): Promise<
  { status: 'ok'; schema: string } | { status: 'err'; message: string }
> {
  try {
    let data: IntrospectionQuery;
    if (options.fromJson) {
      const response = await fetchJsonSchema(endpoint, options)
      data = response.data
    } else {
      const response = await fetchIntrospectionQuery(endpoint, options)
      data = response.data
      if (response.errors) {
        return { status: 'err', message: JSON.stringify(response.errors, null, 2) }
      }
    }
    if (options.json) {
      return {
        status: 'ok',
        schema: JSON.stringify(data, null, 2),
      }
    } else {
      const schema = buildClientSchema(data)
      return {
        status: 'ok',
        schema: printSchema(schema),
      }
    }
  } catch (err) {
    return { status: 'err', message: err.message }
  }
}

async function fetchIntrospectionQuery(
  endpoint: string,
  options: Options,
): Promise<{ data: IntrospectionQuery; errors: any[]; }> {
  return await fetch(endpoint, {
    method: options.method,
    headers: options.headers,
    body: JSON.stringify({ query: introspectionQuery }),
  }).then(res => res.json())
}

async function fetchJsonSchema(
  endpoint: string,
  options: Options,
): Promise<{ data: IntrospectionQuery; errors: any[]; }> {
  return await fetch(endpoint, {
    method: options.method,
    headers: options.headers,
  }).then(res => res.json())
}

/**
 *
 * Prints schema to file.
 *
 * @param dist
 * @param schema
 */
export function printToFile(
  dist: string,
  schema: string,
): { status: 'ok'; path: string } | { status: 'err'; message: string } {
  try {
    const output = path.resolve(process.cwd(), dist)

    if (!fs.existsSync(output)) {
      mkdirp.sync(output)
    }
    fs.writeFileSync(output, schema)

    return { status: 'ok', path: output }
  } catch (err) {
    return { status: 'err', message: err.message }
  }
}
