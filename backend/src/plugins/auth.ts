import { Elysia, t, type Static } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

// Define a type for our user object to avoid 'any'
type User = Static<typeof users['$inferSelect']> | null;

// The main plugin to derive user from JWT
export const authPlugin = new Elysia({ name: 'plugin:auth' })
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET!,
      schema: t.Object({
        id: t.Number(),
      }),
    })
  )
  .derive(async ({ jwt, cookie: { auth } }) => {
    const profile = await jwt.verify(auth?.value);
    if (!profile) {
      return { user: null as User };
    }
    const [user] = await db.select().from(users).where(eq(users.id, profile.id)).limit(1);
    return { user: user || null };
  });

// Exportable guard object for route protection
export const authGuard = {
  // Guard for general authentication
  isAuthenticated: {
    beforeHandle: ({ user, set }: { user: User; set: any }) => {
      if (!user) {
        set.status = 401;
        return { message: 'Unauthorized' };
      }
    },
  },
  // Guard for admin-only routes
  isAdmin: {
    beforeHandle: ({ user, set }: { user: User; set: any }) => {
      if (!user) {
        set.status = 401;
        return { message: 'Unauthorized' };
      }
      if (user.role !== 'ADMIN') {
        set.status = 403;
        return { message: 'Forbidden' };
      }
    },
  },
};