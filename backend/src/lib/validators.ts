import { t } from 'elysia';

// Auth
export const RegisterModel = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 8 }),
});

export const LoginModel = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String(),
});

// Products
export const CreateProductModel = t.Object({
    name: t.String({ minLength: 3 }),
    description: t.String(),
    price: t.Numeric({ minimum: 0, multipleOf: 1 }) // Price in cents
});

export const UpdateProductModel = t.Object({
    name: t.Optional(t.String({ minLength: 3 })),
    description: t.Optional(t.String()),
    price: t.Optional(t.Numeric({ minimum: 0, multipleOf: 1 }))
});

// Generic
export const IdParam = t.Object({ id: t.Numeric() });