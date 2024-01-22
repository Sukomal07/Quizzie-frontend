import '../../styles/CreateQuiz.css'

import { useState } from 'react';

import QuestionCard from '../../components/QuestionCard';

function CreateQuiz({ setActiveTab }) {
    const [visible, setVisible] = useState(true);
    const [model, setModel] = useState(true);
    const [questionCount, setQuestionCount] = useState(1);
    const [quiz, setQuiz] = useState({
        name: '',
        type: ''
    });
    const [error, setError] = useState({
        quizNameError: '',
        quizTypeError: ''
    });

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setQuiz({ ...quiz, [name]: value });
        setError({ ...error, quizNameError: '' });
    };

    const handleCancel = () => {
        setActiveTab('dashboard');
        setVisible(false);
    };

    const handleContinue = () => {
        if (quiz.name.trim() === '') {
            setError({ ...error, quizNameError: 'Quiz name is required.' });
        } else if (quiz.type.trim() === '') {
            setError({ ...error, quizTypeError: 'Quiz type is required.' });
        } else {
            setModel(false);
        }
    };

    const handleQuizType = (type) => {
        setQuiz({ ...quiz, type });
        setError({ ...error, quizTypeError: '' });
    };

    const handleAddQuestion = () => {
        if (questionCount < 5) {
            setQuestionCount((prevCount) => prevCount + 1);
        }
    };

    const handleRemoveQuestion = () => {
        setQuestionCount((prevCount) => prevCount - 1);
    };

    const renderCloseButton = (questionNumber) => {
        if (questionNumber > 1) {
            return <span className='close' onClick={() => handleRemoveQuestion(questionNumber)}>x</span>;
        }
        return null;
    };

    const containerStyle = { display: `${visible ? 'flex' : 'none'}` };

    return (
        <div className="create-quiz-container" style={containerStyle}>
            <div className="model">
                <div className="first-model" style={{ display: `${model ? 'flex' : 'none'}` }}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Quiz name"
                        id="name"
                        autoComplete="off"
                        autoFocus
                        onChange={handleUserInput}
                        value={quiz.name || error.quizNameError}
                        style={{ border: error.quizNameError ? '1px solid red' : '' }}
                    />
                    <div>
                        <div className="quiz-type">
                            <span className="type">Quiz type</span>
                            <span className={quiz.type === 'Q&A' ? 'q activeType' : 'q'} onClick={() => handleQuizType('Q&A')}>
                                Q & A
                            </span>
                            <span className={quiz.type === 'Poll' ? 'q activeType' : 'q'} onClick={() => handleQuizType('Poll')}>
                                Poll
                            </span>
                        </div>
                        {error.quizTypeError && <p className="error">{error.quizTypeError}</p>}
                    </div>
                </div>
                <div className='question-container' style={{ display: `${model ? 'none' : 'flex'}` }}>
                    <div className="header">
                        <div className='numbers'>
                            {[...Array(questionCount).keys()].map((index) => (
                                <div className="question-number" key={index + 1}>
                                    {index + 1} {renderCloseButton(index + 1)}
                                </div>
                            ))}
                            {questionCount < 5 && <span className='plus' onClick={handleAddQuestion}>+</span>}
                        </div>
                        <span className='max'>Max 5 Questions</span>
                    </div>
                    <div className="create-question">
                        <QuestionCard quizType={quiz.type} />
                    </div>
                </div>
                <div className="buttons">
                    <button className="cancel" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="continue" onClick={handleContinue} style={{ display: `${model ? '' : 'none'}` }}>
                        Continue
                    </button>
                    <button className='continue' style={{ display: `${model ? 'none' : ''}` }}>
                        Create Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateQuiz;
