import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { plantService } from '../services/plant.service.local.js';

const questions = [
    { id: 1, question: 'Where do you want the plant?', options: ['Indoor', 'Outdoor', 'Both'] },
    { id: 2, question: 'How much light does the spot get?', options: ['No direct light', 'Partial light', 'Full sun'] },
    { id: 3, question: 'What level of care are you comfortable with?', options: ['Low', 'Medium', 'High'] },
    { id: 4, question: 'Do you prefer flowering or non-flowering plants?', options: ['Flowering', 'Non-flowering', 'No preference'] },
    { id: 5, question: 'Do you have pets?', options: ['Yes', 'No'] },
];

export function Questionnaire() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

    const handleAnswer = (option) => {
        const question = questions[currentQuestionIndex];
        setAnswers({ ...answers, [question.id]: option });

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Save answers and navigate to results
            plantService.saveUserProfile(answers);
            navigate('/plant');
        }
    };

    const question = questions[currentQuestionIndex];
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>{question.question}</h2>
            <div>
                {question.options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        style={{ margin: '10px', padding: '10px 20px' }}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
