import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../Middleware/authMiddleware.js";
import Order from "../Models/OderModel.js";

const orderRoutes = express.Router();

//ORDER
orderRoutes.post(
    "/",
    protect,
    asyncHandler(async (req, res) => {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice
        } = req.body;
        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error('Không có order')
        } else {
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice
            })

            const createOrder = await order.save();
            res.status(201).json(createOrder);
        }
    })
);

export default orderRoutes