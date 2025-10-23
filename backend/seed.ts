import { db } from './src/db';
import { users } from './src/db/schema';
import { eq } from 'drizzle-orm';

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'superstrongpassword'; // In a real app, use an env var for this

async function seed() {
  console.log('🌱 Starting database seed...');

  // Check if admin user already exists
  const [existingAdmin] = await db.select().from(users).where(eq(users.email, ADMIN_EMAIL)).limit(1);

  if (existingAdmin) {
    console.log('✅ Admin user already exists. Skipping.');
  } else {
    const hashedPassword = await Bun.password.hash(ADMIN_PASSWORD, {
      algorithm: 'bcrypt',
    });

    await db.insert(users).values({
      email: ADMIN_EMAIL,
      hashedPassword,
      role: 'ADMIN',
    });
    console.log('🚀 Created admin user:');
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
  }

  console.log('🌱 Seeding complete.');
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});