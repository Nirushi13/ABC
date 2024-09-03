import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import queryRouter from "./routes/queryRoute.js";
import offerRouter from "./routes/offerRouter.js";
import reservationRouter from "./routes/reservationRouter.js";
import galleryRouter from './routes/galleryRoutes.js';

// App configuration
const app = express();
const port = 4000;

// DB connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter);
app.use("/api/query",queryRouter)
app.use("/api/offer", offerRouter);
app.use("/api/reservations",reservationRouter);
app.use("/api/gallery", galleryRouter);



app.get("/", (req, res) => {
  res.send("API Working");
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
