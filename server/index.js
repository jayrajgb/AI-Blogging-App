import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API started!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running at PORT:", PORT);
});

export default app;
