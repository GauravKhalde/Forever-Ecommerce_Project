import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Stores user's cart data (like productId: quantity).
    // Default is an empty cart, and we keep it saved even if it's empty.

    cartData: { type: Object, default: {} }
}, { minimize: false })                             // Ensures empty objects like cartData: {} are not removed from DB

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel;