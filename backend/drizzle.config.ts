import type { Config } from 'drizzle-kit';

export default {
    schema: './src/db/schema.ts',
    out: './drizzle',
    driver: 'turso', // Turso driver is compatible with bun:sqlite
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
} satisfies Config;