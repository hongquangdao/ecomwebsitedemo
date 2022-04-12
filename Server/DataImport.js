import express from "express";
import User from "./Models/UserModel.js";
import Products from "./Models/ProductModel.js";
import users from "./data/users.js";
import products from "./data/product.js";
import asyncHandler from "express-async-handler"

const ImportData = express.Router();

ImportData.post(
    "/users",
    asyncHandler(async (req, res) => {
        await User.deleteMany({});
        const importUser = await User.insertMany(users);
        res.send({ importUser });
    })
);

ImportData.post(
    "/products",
    asyncHandler(async (req, res) => {
        await Products.deleteMany({});
        const importProduct = await Products.insertMany(products);
        res.send({ importProduct });
    })
);

export default ImportData