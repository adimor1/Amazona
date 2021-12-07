import moongoose from 'mongoose';

const productSchema = new moongoose.Schema({
    name: { type: String, required: true, unique: true },
    seller: {type: moongoose.Schema.Types.ObjectId},
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
},
    {
        timestamps: true,
    });

    const Product = moongoose.model('Product', productSchema); 

    export default Product;