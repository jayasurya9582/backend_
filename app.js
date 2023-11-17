import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import adminRouter from "./routes/admin-routes";
dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/movie",movieRouter);
app.use("/booking",bookingsRouter)



mongoose
    .connect(
  `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.3hyzpol.mongodb.net/`
)
.then(()=>

app.listen(5000, () => 
 console.log("Connected To Database And Server is running")
)
)

.catch((e)=>console.log(e));



//mbcrViFrYicG8H88