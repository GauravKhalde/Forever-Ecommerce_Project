import { json } from "express";
import upload from "../middleware/multer.js";
import { v2 as cloudinary } from 'cloudinary';
import productModel from "../models/productModel.js";



// function for add product

const addProduct = async (req, resp) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // ✅ Upload images to Cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        // ✅ Create product data object
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            images: imagesUrl,
            date: Date.now()

        }
        console.log(productData)
        const product = new productModel(productData)
        await product.save()


        resp.json({ success: true, message: "product added" })


    }
    catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });
    }

}


// function for list product

const listProduct = async (req, resp) => {
try{
 const products = await productModel.find({});
 resp.json({success:true,products})
}
catch(error){
  console.log(error);
  resp.json({ success: false, message: error.message });
}
}



// function for remove product

const removeProduct = async (req, resp) => {
try{
 await productModel.findByIdAndDelete(req.body.id)
 resp.json({success:true,message:"product Removed"})
}catch{
    console.log(error)
    resp.json({success:false, message:error.message})

}
}



// function for single product

const singleProduct = async (req, resp) => {
    try{
        const {productId}=req.body
    const product= await productModel.findById(productId)
    resp.json({success:true, product})
    }
    catch(error){
        console.log(error)
        resp.json({success:false, message:error.message})
    }
    

}


export { listProduct, addProduct, removeProduct, singleProduct }