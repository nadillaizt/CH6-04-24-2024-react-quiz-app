import { useState } from 'react';
import QUESTIONS from '../question';
import image_quizComplete from '../assets/quiz-complete.png';

const Quiz = () => {
	const [userAnswers, setUserAnswers] = useState([]);

	const activeQuestionIndex = userAnswers.length;
	const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

	const handleSelectAnswer = (selectedAnswer) => {
		setUserAnswers((prev) => {
			return [...prev, selectedAnswer];
		});
	};

	if (quizIsComplete) {
		return (
			<>
				<div id='summary'>
					<img
						src={image_quizComplete}
						alt=''
					/>
					<h2>KUIS SELESAI WOIII</h2>

				</div>
			</>
		);
	}

	const shuffledANswers = [...QUESTIONS[activeQuestionIndex].answers];
	shuffledANswers.sort(() => Math.random() - 0.5);

	return (
		<main>
			<div id='quiz'>
				<div id='question'>
					<p>{QUESTIONS[activeQuestionIndex].text}</p>

					<ul id='answers'>
						{shuffledANswers.map((answer) => (
							<li
								key={answer}
								className='answer'
							>
								<button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</main>
	);
};

export default Quiz;