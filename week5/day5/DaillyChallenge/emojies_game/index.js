import express from "express";
import cors from "cors";
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.static("views"));

const emojis = [
    { emoji: '😀', name: 'Smile' },
    { emoji: '🐶', name: 'Dog' },
    { emoji: '🌮', name: 'Taco' },
];
app.get("/game", (req, res) => {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  const correctEmoji = emojis[randomIndex];

  let options = emojis
    .filter((e, i) => i !== randomIndex)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map(e => e.name);

  options.push(correctEmoji.name);
  options.sort(() => 0.5 - Math.random());

  res.json({
    emoji: correctEmoji.emoji,
    options: options,
    answer: correctEmoji.name
  });
});

app.post("/guess", (req, res) => {
  const { selected, correct } = req.body;
  const isCorrect = selected === correct;
  res.json({
    correct: isCorrect,
    message: isCorrect ? "Correct!" : "Wrong!"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});