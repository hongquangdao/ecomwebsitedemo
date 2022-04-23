import express, { json } from "express"; //Framework dùng để sắp xếp code trên nền tảng nodejs
import dotenv from "dotenv";
import connectDatabase from "./Config/MongoDB.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Error.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRoutes from "./Routes/OrderRoutes.js";

dotenv.config();
connectDatabase();
const app = express();

app.use(express.json())

// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRoutes);
app.get("/api/config/paypal",(req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
})

//Error handler
app.use(notFound);
app.use(errorHandler);

const SERVER_PORT = process.env.SERVER_PORT || 1001;

app.listen(SERVER_PORT, console.log(`Server is runing in port ${SERVER_PORT}`));