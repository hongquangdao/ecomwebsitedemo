import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../Middleware/authMiddleware.js";
import Order from "../Models/OrderModel.js";

const orderRoutes = express.Router();

//CREATE ORDER
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


//GET ORDER BY ID
orderRoutes.get(
    "/:id",
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email",
        );

        if (order) {
            res.json(order);
        } else {
            res.status(404);
            throw new Error("Không tìm thấy Order")
        }
    })
);

export default orderRoutes