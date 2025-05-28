import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Lib/connectDB.js";
import appRoutes from "./Routes/index.js"

dotenv.config();

const PORT = process.env.PORT || 8000

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('CRM backend API is running...');
});

app.use("/api", appRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`server is running in the port ${process.env.PORT}`);
});
