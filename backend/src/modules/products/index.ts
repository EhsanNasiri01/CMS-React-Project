import { Elysia } from 'elysia';
import { db } from '../../db';
import { products } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { authPlugin, authGuard } from '../../plugins/auth';
import { CreateProductModel, UpdateProductModel, IdParam } from '../../lib/validators';

export const productsController = new Elysia({ prefix: '/products' })
  .use(authPlugin)
  // --- Public Routes ---
  .get('/', async () => {
    const allProducts = await db.select().from(products);
    return { products: allProducts };
  })
  .get('/:id', async ({ params, set }) => {
    const [product] = await db.select().from(products).where(eq(products.id, params.id)).limit(1);
    if (!product) {
      set.status = 404;
      return { message: 'Product not found' };
    }
    return { product };
  }, { params: IdParam })
  // --- Admin-Only Routes ---
  .guard(authGuard.isAdmin, (app) =>
    app
      .post('/',
        async ({ body, set }) => {
          const [newProduct] = await db.insert(products).values(body).returning();
          set.status = 201;
          return { message: 'Product created', product: newProduct };
        },
        { body: CreateProductModel }
      )
      .put('/:id',
        async ({ params, body, set }) => {
          const [updatedProduct] = await db.update(products)
            .set({ ...body, updatedAt: new Date() })
            .where(eq(products.id, params.id))
            .returning();

          if (!updatedProduct) {
            set.status = 404;
            return { message: 'Product not found' };
          }
          return { message: 'Product updated', product: updatedProduct };
        },
        { params: IdParam, body: UpdateProductModel }
      )
      .delete('/:id',
        async ({ params, set }) => {
          const [deletedProduct] = await db.delete(products).where(eq(products.id, params.id)).returning({ id: products.id });
          if (!deletedProduct) {
            set.status = 404;
            return { message: 'Product not found' };
          }
          return { message: `Product with id ${deletedProduct.id} deleted` };
        },
        { params: IdParam }
      )
  );