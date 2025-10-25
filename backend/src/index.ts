import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import { usersController } from './modules/users';
import { productsController } from './modules/products';

const app = new Elysia();
// Add API documentation via Swagger

// CORS: Only allow requests from your frontend's domain in production.
// During development, you might allow localhost.
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production'
      ? 'https://your-frontend-domain.com'
      : 'http://localhost:3000', // Example for a Vite React frontend
    credentials: true, // Allow cookies to be sent
  })
);


app.use(
  swagger({
    path: '/docs',
    documentation: {
      info: {
        title: 'Bun CMS Backend',
        version: '1.0.0',
        description: 'API documentation for the Bun, Elysia, and SQLite CMS',
      },
      tags: [
        { name: 'Users', description: 'User authentication and management' },
        { name: 'Products', description: 'Product management' }
      ]
    },
    // --- ADD THIS BLOCK ---
    // This tells the Swagger UI to send cookies with every request.
    swaggerOptions: {
      withCredentials: true,
    },
    // --------------------
  })
);

// Global error handler
app.onError(({ code, error, set }) => {
  console.error(`Error [${code}]: ${error.toString()}`);

  if (code === 'VALIDATION') {
    set.status = 400;
    return {
      message: 'Validation failed',
      errors: error.all.map(e => ({ path: e.path, message: e.message }))
    }
  }

  set.status = 500;
  return { message: 'An internal server error occurred.' };
});
// Group all routes under /api/v1
app.get('/favicon.ico', ({ set }) => {
  set.status = 204; // No Content
  return;
});
app.group('/api/v1', (api) =>
    api
        .use(usersController)
        .use(productsController)
);
app.listen(3000, ({ hostname, port }) => {
  // These two lines are now corrected with backticks
  console.log(`🦊 Server running at http://${hostname}:${port}`);
  console.log(`📄 API documentation at http://${hostname}:${port}/docs`);
});
// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nReceived SIGINT, shutting down gracefully...');
    app.stop().then(() => {
        console.log('Server stopped.');
        process.exit(0);
    });
});
process.on('SIGTERM', () => {
    console.log('\nReceived SIGTERM, shutting down gracefully...');
    app.stop().then(() => {
        console.log('Server stopped.');
        process.exit(0);
    });
});