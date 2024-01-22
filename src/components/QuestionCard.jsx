import { useState } from 'react';

import deleteImage from '../assets/deleteImage.svg';

function QuestionCard({ quizType }) {
    const [question, setQuestion] = useState({
        questionName: '',
        optionType: '',
        options: [
            { id: 1, option: { text: '', imageUrl: '' }, isCorrect: false },
            { id: 2, option: { text: '', imageUrl: '' }, isCorrect: false }
        ]
    });

    console.log(question);

    const handleOptionTypeChange = (type) => {
        setQuestion((prevQuestion) => ({
            ...prevQuestion,
            optionType: type,
            options: prevQuestion.options.map((opt) => ({ ...opt, isCorrect: false }))
        }));
    };

    const handleAddOption = () => {
        if (question.options.length < 4) {
            setQuestion((prevQuestion) => ({
                ...prevQuestion,
                options: [
                    ...prevQuestion.options,
                    { id: prevQuestion.options.length + 1, option: { text: '', imageUrl: '' }, isCorrect: false }
                ]
            }));
        }
    };

    const handleDeleteOption = (id) => {
        setQuestion((prevQuestion) => ({
            ...prevQuestion,
            options: prevQuestion.options.filter((opt) => opt.id !== id)
        }));
    };
    const handleOptionSelection = (id) => {
        setQuestion((prevQuestion) => ({
            ...prevQuestion,
            options: prevQuestion.options.map((opt) => ({
                ...opt,
                isCorrect: opt.id === id
            }))
        }));
    };
    return (
        <div className="create-question-container">
            <input
                type="text"
                name="questionName"
                id="questionName"
                autoComplete="off"
                autoFocus
                placeholder={`${quizType} Question`}
                value={question.questionName}
                onChange={(e) => setQuestion((prevQuestion) => ({ ...prevQuestion, questionName: e.target.value }))}
            />
            <div className="question-type">
                <span>Option Type</span>
                <div className="q-types">
                    {['text', 'imageUrl', 'text_and_image'].map((type) => (
                        <div key={type}>
                            <input
                                type="radio"
                                name="optionType"
                                id={type}
                                checked={question.optionType === type}
                                onChange={() => handleOptionTypeChange(type)}
                            />
                            <label htmlFor={type}>
                                {type === 'text_and_image' ? 'Text & Image Url' : type === 'text' ? 'Text' : 'Image Url'}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className='option-timer'>
                <div className="options">
                    {question.options.map((option) => (
                        <div key={option.id}>
                            <input type="radio" name={`option${option.id}`} id={`option${option.id}`} checked={option.isCorrect}
                                onChange={() => handleOptionSelection(option.id)} />
                            <input
                                type="text"
                                name={`option${option.id}`}
                                placeholder={question.optionType === 'imageUrl' ? 'Image Url' : 'Text'}
                                autoComplete="off"
                                value={question.optionType === 'imageUrl' ? option.option.imageUrl : option.option.text}
                                onChange={(e) =>
                                    setQuestion((prevQuestion) => ({
                                        ...prevQuestion,
                                        options: prevQuestion.options.map((o) =>
                                            o.id === option.id ? { ...o, text: e.target.value } : o
                                        )
                                    }))
                                }
                            />
                            {question.optionType === 'text_and_image' && (
                                <input
                                    type="text"
                                    name={`option${option.id}`}
                                    placeholder="Image URL"
                                    autoComplete="off"
                                    value={option.option.imageUrl}
                                    onChange={(e) =>
                                        setQuestion((prevQuestion) => ({
                                            ...prevQuestion,
                                            options: prevQuestion.options.map((o) =>
                                                o.id === option.id ? { ...o, imageUrl: e.target.value } : o
                                            )
                                        }))
                                    }
                                />
                            )}
                            {question.options.length > 2 && (
                                <img
                                    src={deleteImage}
                                    className='deleteIcon'
                                    alt="icon"
                                    onClick={() => handleDeleteOption(option.id)}
                                />
                            )}
                        </div>
                    ))}
                    {question.options.length < 4 && <button className='add-option' onClick={handleAddOption}>Add Option</button>}
                </div>
                {quizType === 'Q&A' && (
                    <div className='timer'>
                        <span>Timer</span>
                        <span className='style'>OFF</span>
                        <span className='style'>5 sec</span>
                        <span className='style'>10 sec</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuestionCard;
