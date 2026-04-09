import { defineConfig } from 'prisma/config';

export default defineConfig({
  // @ts-ignore
  datasourceUrl: process.env.DATABASE_URL,
});