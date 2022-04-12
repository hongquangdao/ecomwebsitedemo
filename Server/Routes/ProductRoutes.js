import express from "express";
import asyncHandler from "express-async-handler";
import Products from "../Models/ProductModel.js";

const productRoute = express.Router();

//GET ALL PRODUCT
productRoute.get(
    "/",
    asyncHandler(async (req, res) => {
        const products = await Products.find({});
        res.json(products);
    })
);

//GET SINGLE PRODUCT
productRoute.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const product = await Products.findById(req.params.id);
        if( product ) {
            res.json(product)
        } else {
            res.status(404);
            throw new Error("Product Not Found")
        }
    })
)

export default productRoute;