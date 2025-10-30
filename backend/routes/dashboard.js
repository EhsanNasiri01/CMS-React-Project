import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import {
    getDashboard,
    getProductList,
    getProductDetails,
    createProduct,
    editProduct,
    deleteProduct,
} from "../conrtollers/dashboard.js";
const router = Router();
export function dashboardRoutes() {
    router.get('/', getDashboard);
    router.get('/products',isLoggedIn, getProductList);
    router.get('/productDetails',isLoggedIn, getProductDetails);
    router.post('/product',isLoggedIn,createProduct);
    router.put('/product/:productID',isLoggedIn,editProduct);
    router.delete('/product/:productID',isLoggedIn,deleteProduct);
    return router;
};