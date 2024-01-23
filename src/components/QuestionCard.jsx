import deleteImage from '../assets/deleteImage.svg';

function QuestionCard({ quizType, question, setQuestion, isActive }) {

    const handleOptionTypeChange = (type) => {
        setQuestion((prevQuestion) => ({
            ...prevQuestion,
            optionType: type,
            options: prevQuestion.options.map((opt) => ({ ...opt, isCorrect: false })),
        }));
    };

    const handleAddOption = () => {
        if (question.options.length < 4) {
            setQuestion((prevQuestion) => ({
                ...prevQuestion,
                options: [
                    ...prevQuestion.options,
                    {
                        id: prevQuestion.options.length + 1,
                        option: { ...initialOption },
                        isCorrect: false,
                    },
                ],
            }));
        }
    };

    const handleDeleteOption = (id) => {
        setQuestion((prevQuestion) => ({
            ...prevQuestion,
            options: prevQuestion.options.filter((opt) => opt.id !== id),
        }));
    };

    const handleOptionSelection = (id) => {
        setQuestion((prevQuestion) => ({
            ...prevQuestion,
            options: prevQuestion.options.map((opt) => ({
                ...opt,
                isCorrect: opt.id === id,
            })),
        }));
    };

    const handleInputChange = (e, optionId) => {
        const { name, value } = e.target;
        setQuestion((prevQuestion) => ({
            ...prevQuestion,
            options: prevQuestion.options.map((o) =>
                o.id === optionId
                    ? {
                        ...o,
                        option: { ...o.option, [name]: value },
                    }
                    : o
            ),
        }));
    };
    const handleTimerOptionChange = (timerOption) => {
        setQuestion((prevQuestion) => ({
            ...prevQuestion,
            timerOption,
        }));
    };

    return (
        <div className="create-question-container" style={{ display: isActive ? 'flex' : 'none' }}>
            <input
                type="text"
                name="questionName"
                id='questionName'
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
            <div className="option-timer">
                <div className="options">
                    {question.options.map((option, index) => (
                        <div key={option.id}>
                            {quizType === 'Q&A' && (
                                <input
                                    type="radio"
                                    name={`option${option.id}`}
                                    checked={option.isCorrect}
                                    onChange={() => handleOptionSelection(option.id)}
                                />
                            )}
                            <input
                                type="text"
                                name={question.optionType === 'imageUrl' ? 'imageUrl' : 'text'}
                                placeholder={question.optionType === 'imageUrl' ? 'Image Url' : 'Text'}
                                autoComplete="off"
                                value={question.optionType === 'imageUrl' ? option.option.imageUrl : option.option.text}
                                onChange={(e) => handleInputChange(e, option.id)}
                                className={option.isCorrect ? 'option correctQuestion' : 'option'}
                            />
                            {question.optionType === 'text_and_image' && (
                                <input
                                    type="text"
                                    name="imageUrl"
                                    placeholder="Image URL"
                                    autoComplete="off"
                                    value={option.option.imageUrl}
                                    onChange={(e) => handleInputChange(e, option.id)}
                                    className={option.isCorrect ? 'option correctQuestion' : 'option'}
                                />
                            )}
                            {question.options.length > 2 && index === question.options.length - 1 && (
                                <img
                                    src={deleteImage}
                                    className="deleteIcon"
                                    alt="icon"
                                    onClick={() => handleDeleteOption(option.id)}
                                />
                            )}
                        </div>
                    ))}
                    {question.options.length < 4 && <button className="add-option" onClick={handleAddOption}>Add Option</button>}
                </div>
                {quizType === 'Q&A' && (
                    <div className="timer">
                        <span>Timer</span>
                        {['off', '5', '10'].map((timerOption) => (
                            <span
                                key={timerOption}
                                className={`style ${question.timerOption === timerOption ? 'activeTimer' : ''}`}
                                onClick={() => handleTimerOptionChange(timerOption)}
                            >
                                {timerOption === 'off' ? 'OFF' : `${timerOption} sec`}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuestionCard;
