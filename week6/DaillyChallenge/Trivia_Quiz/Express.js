import express from "express";
import expressRoutes from "./routes/express.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/quiz", expressRoutes);

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
