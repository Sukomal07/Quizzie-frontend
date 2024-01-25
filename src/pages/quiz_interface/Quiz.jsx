import '../../styles/Quiz.css';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { attemptPollQuiz, attemptQNAQuiz, getQuiz } from '../../redux/slices/QuizSlice';

function Quiz() {
    const dispatch = useDispatch();
    const { quizId } = useParams();
    const quiz = useSelector((state) => state.quizSlice.quiz);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timer, setTimer] = useState(null);
    const [data, setData] = useState({
        _id: quizId,
        answers: []
    });
    const timerRef = useRef();

    useEffect(() => {
        async function fetchData() {
            await dispatch(getQuiz(quizId));
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (quiz?.questions) {
            setData(data => ({ ...data, answers: Array(quiz.questions.length).fill(null) }));
        }
    }, [quiz?.questions]);

    useEffect(() => {
        const question = quiz?.questions?.[currentQuestionIndex];
        if (question?.timerOption && question.timerOption !== 'off') {
            setTimer(question.timerOption);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            timerRef.current = setInterval(() => {
                setTimer((prevTimer) => prevTimer > 0 ? prevTimer - 1 : 0);
            }, 1000);
        }
        return () => clearInterval(timerRef.current);
    }, [quiz?.questions, currentQuestionIndex]);


    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz?.totalQuestions) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleSubmitQuiz = async () => {
        if (quiz?.quizType === 'Q&A') {
            const res = await dispatch(attemptQNAQuiz(data))
            console.log(res.payload);
        } else {
            const res = await dispatch(attemptPollQuiz(data))
            console.log(res.payload);
        }
    };

    const handleOptionClick = (index) => {
        if (quiz?.quizType === 'Poll' || currentQuestion?.timerOption === 'off' || timer > 0) {
            const updatedAnswers = [...data.answers];
            updatedAnswers[currentQuestionIndex] = index;
            setData(data => ({ ...data, answers: updatedAnswers }));
        }
    };


    const currentQuestion = quiz?.questions?.[currentQuestionIndex];

    return (
        <div className='quiz-container'>
            {currentQuestion && (
                <div className='quiz-questions'>
                    <div className='question-header'>
                        <span className='questionIndex'>0{currentQuestionIndex + 1} / 0{quiz?.totalQuestions}</span>
                        {currentQuestion?.timerOption !== 'off' && quiz?.quizType !== 'Poll' && (
                            <span className='question-timer'>00:{timer?.toString()?.padStart(2, '0')}s</span>
                        )}
                    </div>
                    <div className='question-details'>
                        <h1 className='question-text'>{currentQuestion?.questionName}</h1>
                        <div className='question-options'>
                            {currentQuestion?.options?.map((option, index) => {
                                return (
                                    <div key={option._id} className={`question-option ${data.answers[currentQuestionIndex] === index ? 'selected-option' : ''}`}
                                        onClick={() => handleOptionClick(index)}>
                                        {currentQuestion?.optionType === 'text' && (
                                            <span>{option?.text}</span>
                                        )}
                                        {currentQuestion?.optionType === 'image' && option?.imageUrl && (
                                            <img src={option?.imageUrl} alt={option?.text} />
                                        )}
                                        {currentQuestion?.optionType === 'text_and_image' && (
                                            <>
                                                <span>{option?.text}</span>
                                                {option?.imageUrl && <img src={option?.imageUrl} alt={option?.text} />}
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='navigation-buttons'>
                        {currentQuestionIndex === quiz?.questions?.length - 1 ? (
                            <button onClick={handleSubmitQuiz}>Submit</button>
                        ) : (
                            <button onClick={handleNextQuestion}>Next</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Quiz;