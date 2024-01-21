import '../../styles/CreateQuiz.css'

import { useState } from 'react';

function CreateQuiz({ setActiveTab }) {
    const [visible, setVisible] = useState(true);
    const [firstModel, setFirstModel] = useState(true);
    const [quizType, setQuizType] = useState('');
    const [quizName, setQuizName] = useState('');
    const [error, setError] = useState('');

    const handleUserInput = (e) => {
        const { value } = e.target;
        setQuizName(value);
        setError('');
    };

    const handleCancel = () => {
        setActiveTab('dashboard');
        setVisible(false);
    };

    const handleContinue = () => {
        if (quizName.trim() === '' || quizType.trim() === '') {
            setError('Quiz name and type are required.');
        } else {
            setFirstModel(false);
        }
    };

    const handleQuizType = (type) => {
        setQuizType(type);
        setError('');
    };

    return (
        <div className="create-quiz-container" style={{ display: `${visible ? 'flex' : 'none'}` }}>
            <div className="model">
                <div className="first-model" style={{ display: `${firstModel ? 'flex' : 'none'}` }}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Quiz name"
                        id="name"
                        autoComplete="off"
                        autoFocus
                        onChange={handleUserInput}
                        value={quizName}
                    />
                    <div className="quiz-type">
                        <span className="type">Quiz type</span>
                        <span className={quizType === 'Q&A' ? 'q activeType' : 'q'} onClick={() => handleQuizType('Q&A')}>
                            Q & A
                        </span>
                        <span className={quizType === 'Poll' ? 'q activeType' : 'q'} onClick={() => handleQuizType('Poll')}>
                            Poll
                        </span>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <div className="buttons">
                        <button className="cancel" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className="continue" onClick={handleContinue}>
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateQuiz;
