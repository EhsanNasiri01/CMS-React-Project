import Product from '../models/product.js'
import User from '../models/user.js';

//صفحه داشبورد
export function getDashboard(req, res) {
    try {
        const session = req.session;
        if (!session || !session.user) return res.redirect('/login');
        res.send('dashboard');
    } catch (error) {
        res.send(error);
    }
};

//product controllers

//لیست محصولات
export async function getProductList(req, res) {
    try {
        const products = await Product.find();
        if (!products) return res.send('there is no product here')
        res.send(products);
    } catch (error) {
        res.send('error in getProductList ' + error);
    }
};

//جزئیات محصول
export async function getProductDetails(req, res) {
    try {
        const product = await Product.find({ productID: req.params.productID }); //پارامتر productID را به url اضافه کنید
        if (!product) return res.send('the product is not exist');
        res.send(product);
    } catch (error) {
        res.send('error in getProductDetails ' + error);
    }
};

//ایجاد محصول
export async function createProduct(req, res) {
    try {
        const { name, description, count } = req.body; //برای ایجاد محصول این موارد را در فرم وارد کنید
        const product = Product.findOne({ name: name });
        if (product) return res.send('this product exist');
        const productID = String(Math.trunc(Math.random() * 100000))
        const newProduct = new Product({
            name: name, //الزامی
            productID: productID, //الزامی
            description: description,
            count: count, //الزامی
        })
        await newProduct.save();
        res.send('new product saved successfully')
    } catch (error) {
        res.send('error in createProduct ' + error);
    }
};

//ویرایش محصول
export async function editProduct(req, res) {
    try {
        const { name, description, count } = req.body
        const product = await Product.find({ productID: req.params.productID }); //پارامتر productID را به url اضافه کنید
        if (!product) return res.send('the product is not exist');
        await product.updateOne({
            name: name, //الزامی
            description: description,
            count: count, //الزامی
        });
        await product.save();
        res.send('edit product successfully')
    } catch (error) {
        res.send('error in editProduct ' + error);
    }
};

//حذف محصول
export async function deleteProduct(req, res) {
    try {
        const product = await Product.findOne({ productID: req.params.productID }); //پارامتر productID را به url اضافه کنید
        if (!product) return res.send('the product is not exist');
        await Product.deleteOne({ productID: req.params.productID });
        res.send('delete product successfully');
    } catch (error) {
        res.send('error in deleteProduct ' + error);
    }
};

//user controllers

//لیست کاربران
export async function getUserList(req, res) {
    try {
        const users = await User.find();
        if (!users) return res.send('there is no user here!');
        res.send(users);
    } catch (error) {
        res.send('error in getUserList ' + error);
    }
};

//جزئیات کاربر
export async function getUserDetails(req, res) {
    try {
        const user = await User.findOne({ userID: req.params.userID }); //پارامتر userID را به url اضافه کنید
        if (!user) res.send('this user is not exist');
        res.send(user);
    } catch (error) {
        res.send('error in getUserDetails ' + error);
    }
};

//ویرایش کاربر
export async function editUser(req, res) {
    try {
        const { email, name, role } = req.body; //برای ویرایش کاربر این موارد را در فرم وارد کنید
        const user = await User.findOne({ userID: req.params.userID }); //پارامتر userID را به url اضافه کنید
        if (!user) return res.send('this user is not exist');
        await user.updateOne({
            email: email, //الزامی
            name: name, //الزامی
            role: role, //الزامی
        })
        await user.save();
        res.send('edit user successfully')
    } catch (error) {
        res.send('error in editUser ' + error);
    }
};

//حذف کاربر
export async function deleteUser(req, res) {
    try {
        const user = await User.findOne({ userID: req.params.userID }); //پارامتر userID را به url اضافه کنید
        if (!user) return res.send('this user is not exist');
        await User.deleteOne({ userID: req.params.userID }); 
        res.send('delete user successfully');
    } catch (error) {
        res.send('error in deleteUser ' + error);
    }
};