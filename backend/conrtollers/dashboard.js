import Product from '../models/product.js'

export function getDashboard(req, res) {
    try {
        const session = req.session;
        if (!session || !session.user) return res.redirect('/login');
        res.send('dashboard');
    } catch (error) {
        res.send(error);
    }
};

export async function getProductList(req, res) {
    try {
        const products = await Product.find();
        if (!products) return res.send('there is no product here')
        res.send(products);
    } catch (error) {
        res.send('error in getProductList ' + error);
    }
};

export async function getProductDetails(req, res) {
    try {
        const product = await Product.find({ productID: req.params.productID });
        if (!product) return res.send('the product is not exist');
        res.send(product);
    } catch (error) {
        res.send('error in getProductDetails ' + error);
    }
};

export async function createProduct(req, res) {
    try {
        const { name, description, count } = req.body;
        const product = Product.findOne({ name: name });
        if (product) return res.send('this product exist');
        const productID = String(Math.trunc(Math.random()*100000))
        const newProduct = new Product({
            name: name,
            productID: productID,
            description: description,
            count: count,
        })
        await newProduct.save;
        res.send('new product saved successfully')
    } catch (error) {
        res.send('error in createProduct ' + error);
    }
};

export async function editProduct(req, res) {
    try {
        const { name, description, productID, count } = req.body
        const product = await Product.find({ productID: req.params.productID });
        if (!product) return res.send('the product is not exist');
        await product.updateOne({
            name: name,
            productID: productID,
            description: description,
            count: count,
        })
        await product.save();
        res.send('edit product successfully')
    } catch (error) {
        res.send('error in editProduct ' + error);
    }
};

export async function deleteProduct(req, res) {
    try {
        const product = await Product.findOne({ productID: req.params.productID });
        if (!product) return res.send('the product is not exist');
        await Product.deleteOne({ productID: req.params.productID });
        res.send('delete product succesfully');
    } catch (error) {
        res.send('error in deleteProduct ' + error);
    }
};