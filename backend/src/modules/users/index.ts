import { Elysia } from 'elysia';
import { db } from '../../db';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { authPlugin, authGuard } from '../../plugins/auth';
import { RegisterModel, LoginModel, IdParam } from '../../lib/validators';

export const usersController = new Elysia({ prefix: '/users' })
  .use(authPlugin)
  // --- Public Routes ---
  .post('/register', 
    async ({ body, set }) => {
      const existingUser = await db.select().from(users).where(eq(users.email, body.email)).limit(1);
      if (existingUser.length > 0) {
        set.status = 409;
        return { message: 'Email already in use.' };
      }

      const hashedPassword = await Bun.password.hash(body.password, { algorithm: 'bcrypt' });
      
      const [newUser] = await db.insert(users).values({ email: body.email, hashedPassword }).returning();
      set.status = 201;
      return { message: 'User created successfully.', user: { id: newUser.id, email: newUser.email } };
    },
    { body: RegisterModel }
  )
  .post('/login',
    async ({ body, jwt, set, cookie: { auth } }) => {
      const [user] = await db.select().from(users).where(eq(users.email, body.email)).limit(1);

      if (!user) {
        set.status = 401;
        return { message: 'Invalid credentials' };
      }

      const isPasswordValid = await Bun.password.verify(body.password, user.hashedPassword);
      if (!isPasswordValid) {
        set.status = 401;
        return { message: 'Invalid credentials' };
      }
      
      const token = await jwt.sign({ id: user.id });
      auth.set({
        value: token,
        httpOnly: true,
        maxAge: 7 * 86400, // 7 days
        path: '/',
      });

      return { message: 'Login successful' };
    },
    { body: LoginModel }
  )
  // --- Authenticated Routes ---
  .guard(authGuard.isAuthenticated, (app) =>
    app
      .post('/logout', ({ cookie: { auth } }) => {
        auth.remove();
        return { message: 'Logout successful' };
      })
      .get('/me', ({ user }) => {
        // Exclude password from response
        const { hashedPassword, ...safeUser } = user!;
        return { user: safeUser };
      })
  )
  // --- Admin-Only Routes ---
  .guard(authGuard.isAdmin, (app) =>
    app
      .get('/', async () => {
          const allUsers = await db.select({ id: users.id, email: users.email, role: users.role, createdAt: users.createdAt }).from(users);
          return { users: allUsers };
      })
      .delete('/:id', async ({ params, set }) => {
          const [deletedUser] = await db.delete(users).where(eq(users.id, params.id)).returning({ id: users.id });
          if (!deletedUser) {
              set.status = 404;
              return { message: 'User not found' };
          }
          return { message: `User with id ${deletedUser.id} deleted` };
      }, { params: IdParam })
  );