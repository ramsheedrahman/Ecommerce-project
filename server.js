import express from 'express'
import colors from "colors";
import dotenv from "dotenv";
import cors from 'cors'
import morgan from "morgan";
import connectDB from './config/Db.js';
import authRoute from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js'
import productsRoute from './routes/productsRoute.js'
const app=express()


dotenv.config();
connectDB()
//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//routes
app.use("/auth", authRoute);
app.use("/category",categoryRoute);
app.use("/product",productsRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
          console.log(
`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
        .white
    );
  });