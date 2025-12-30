import express from "express";
import connectToDB from "./db/connect.js";
import productRouter from "./routes/productRouter.js";
import authRouter from "./routes/Auth.js";
import adminRouter from "./routes/admin.js";
import checkRouter from "./routes/check.js";
import cartRouter from "./routes/cart.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// ---- Allowed frontend URLs ----
const allowedOrigins = [
  "http://localhost:5173",             // local frontend
  "https://backend-1-unc9.onrender.com" // deployed frontend
];

// ---- Middlewares ----
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`❌ CORS blocked: ${origin}`));
      }
    },
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));

// ---- Database ----
await connectToDB();

// ---- Routes ----
app.use("/product", productRouter);
app.use("/user", authRouter);
app.use("/admin", adminRouter);
app.use("/check", checkRouter);
app.use("/cart", cartRouter);

// ---- Server ----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
