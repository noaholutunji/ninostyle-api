const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    price: {
        type: Number,
        required: true,
        trim: true,
        default: 200
    },    
    image: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },  
//    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);