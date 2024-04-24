import { useState, useEffect } from "react";
import QUESTIONS from "../question";
import image_quizComplete from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [timerKey, setTimerKey] = useState(0);
  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  const handleSelectAnswer = (selectedAnswer) => {
    setUserAnswers((prev) => {
      return [...prev, selectedAnswer];
    });
    setTimerKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    if (activeQuestionIndex < QUESTIONS.length) {
      const timer = setTimeout(() => {
        if (!userAnswers[activeQuestionIndex]) {
          handleSelectAnswer(null);
        }
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [activeQuestionIndex, userAnswers]);

  if (quizIsComplete) {
    return (
      <>
        <div id="summary">
          <img src={image_quizComplete} alt="" />
          <h2>KUIS SELESAI WOIII</h2>
        </div>
      </>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <main>
      <div id="quiz">
        <div id="question">
          <QuestionTimer timeout={10000} key={timerKey} />
          <p>{QUESTIONS[activeQuestionIndex].text}</p>
          <ul id="answers">
            {shuffledAnswers.map((answer) => (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>
                  {answer}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Quiz;
