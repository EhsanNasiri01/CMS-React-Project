import { Router } from "express";
import { isAdmin } from "../middlewares/auth.js";
import {
    getDashboard,
    getProductList,
    getProductDetails,
    createProduct,
    editProduct,
    deleteProduct,
    getUserList,
    getUserDetails,
    // createUser,
    editUser,
    deleteUser
} from "../controllers/dashboard.js";
const router = Router();
export function dashboardRoutes() {
    router.get('/', getDashboard);
    //product
    router.get('/products',isAdmin, getProductList);
    router.get('/productDetails/:productID',isAdmin, getProductDetails);
    router.post('/product',isAdmin,createProduct);
    router.put('/product/:productID',isAdmin,editProduct);
    router.delete('/product/:productID',isAdmin,deleteProduct);
    //user
    router.get('/users',isAdmin,getUserList);
    router.get('/userDetails/:userID',isAdmin,getUserDetails);
    // router.post('/user',isAdmin,createUser);
    router.put('/user/:userID',isAdmin,editUser);
    router.delete('/user/:userID',isAdmin,deleteUser);
    return router;
};