import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ProductID: { type: String, required: true },
    description: { type: String },
    count: { type: String, required: true },
});
const Product = new mongoose.model('Product', productSchema);
export default Product;