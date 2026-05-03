// create schema, migrate your db. create your client

import { PrismaClient } from '@prisma/client';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('Missing DATABASE_URL environment variable');
}

export const prismaclient = new PrismaClient({
  datasourceUrl: databaseUrl,
});