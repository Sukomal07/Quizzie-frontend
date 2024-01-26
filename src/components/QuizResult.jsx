import '../styles/QuizResult.css'

import Confetti from 'react-confetti'

import trophy from '../assets/trophy.png'

function QuizResult({ quizType, myScore, totalScore }) {

    return (
        <div className='result-container'>
            <Confetti width={window.innerWidth} height={window.innerHeight} />
            <div className='result'>
                {
                    quizType === 'Q&A' ? (
                        <>
                            <h1>Congrats Quiz is completed</h1>
                            <img src={trophy} alt="trophy" />
                            <h1>Your Score is <span className='score'>0{myScore} / 0{totalScore}</span></h1>
                        </>
                    ) : (
                        <h1 className='poll-result'>Thank you <br /> for participating in <br /> the Poll</h1>
                    )
                }
            </div>
        </div>
    )
}

export default QuizResult
