import '../styles/ShareCard.css'

import Confetti from 'react-confetti'
import toast from 'react-hot-toast'
function ShareCard({ quizId, setActiveTab, setQuizId }) {
    const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL
    const quizUrl = `${FRONTEND_URL}/quiz/${quizId}`;
    const handleShare = () => {
        navigator.clipboard.writeText(quizUrl);
        toast.success('Link copied to clipboard!');
    };
    const handleClose = () => {
        setActiveTab('dashboard')
        setQuizId(null)
    }
    return (
        <div className='share-card'>
            <Confetti width={window.innerWidth} height={window.innerHeight} />
            <div className='share-model'>
                <h1>Congrats your Quiz is Published!</h1>
                <span className='close-model' onClick={handleClose}>X</span>
                <p>{quizUrl}</p>
                <span className='share' onClick={handleShare}>Share</span>
            </div>
        </div>
    )
}

export default ShareCard
