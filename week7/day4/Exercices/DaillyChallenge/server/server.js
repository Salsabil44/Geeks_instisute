import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// GET route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello From Express" });  
});

// POST route
app.post("/api/world", (req, res) => {
  console.log(req.body);  
  res.json({
    message: `I received your POST request. This is what you sent me: ${req.body.value}`,
  });  
});

app.listen(5000, () => console.log("Server running on port 5000"));
