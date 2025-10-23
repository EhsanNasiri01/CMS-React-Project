import { drizzle } from 'drizzle-orm/bun-sqlite';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { Database } from 'bun:sqlite';

// Add the '!' non-null assertion here
const sqlite = new Database(process.env.DATABASE_URL!);
const db = drizzle(sqlite);

async function runMigrations() {
  console.log(' M igrating database...');
  try {
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('✅ Migrations applied successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();