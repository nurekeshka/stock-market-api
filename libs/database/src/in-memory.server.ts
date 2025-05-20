import { MongoMemoryServer } from 'mongodb-memory-server';

let server: MongoMemoryServer | null = null;

export async function createServer(): Promise<MongoMemoryServer> {
  server = await MongoMemoryServer.create();
  return server;
}

export async function closeServer(): Promise<void> {
  await server?.stop();
}
