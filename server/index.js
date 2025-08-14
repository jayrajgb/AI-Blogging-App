import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API started!");
});

app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running at: http://localhost:" + PORT + "/");
});

export default app;
