import express from "express";
import { triviaQuestions } from "../models/trivia.js";

const router = express.Router();

let currentIndex = 0;
let score = 0;

// 🟢 Start the quiz
router.get("/", (req, res) => {
  currentIndex = 0;
  score = 0;
  res.json({ question: triviaQuestions[currentIndex].question });
});

// 🟠 Submit an answer
router.post("/", (req, res) => {
  const userAnswer = req.body.answer;
  let feedback;

  if (userAnswer && userAnswer.toLowerCase() === triviaQuestions[currentIndex].answer.toLowerCase()) {
    score++;
    feedback = { message: "✅ Correct!", score };
  } else {
    feedback = { 
      message: `❌ Wrong! The correct answer was: ${triviaQuestions[currentIndex].answer}`, 
      score 
    };
  }

  currentIndex++;

  if (currentIndex < triviaQuestions.length) {
    res.json({
      ...feedback,
      nextQuestion: triviaQuestions[currentIndex].question
    });
  } else {
    res.redirect("/quiz/score");
  }
});

// 🔵 Final score
router.get("/score", (req, res) => {
  res.json({
    message: "🎉 Quiz finished!",
    finalScore: `${score} / ${triviaQuestions.length}`
  });
});

export default router;
