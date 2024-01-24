import '../../styles/Analytics.css'

import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import deleteImage from '../../assets/deleteImage.svg'
import shareImage from '../../assets/shareImage.svg'
import updateImage from '../../assets/updateImage.svg'
import { deleteQuiz, getAnalytics } from '../../redux/slices/AnalyticsSlice'


function Analytics({ setActiveTab }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const analytics = useSelector((state) => state.analyticsSlice);
    const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL

    useEffect(() => {
        async function fetchData() {
            await dispatch(getAnalytics());
        }

        fetchData()
    }, [])

    const formatCreatedAt = (createdAt) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(createdAt).toLocaleString('en-IN', options);
    }

    const handleDelete = async (quizId) => {
        await dispatch(deleteQuiz(quizId));
        await dispatch(getAnalytics());
    };

    const handleShare = (quizId) => {
        const quizUrl = `${FRONTEND_URL}/quiz/${quizId}`;
        navigator.clipboard.writeText(quizUrl);
        toast.success('Link copied to clipboard!');
    };

    const handleQuestionAnalysis = (quizId) => {
        const quizData = analytics.quizzes.find((quiz) => quiz._id === quizId);

        if (quizData) {
            setActiveTab('questionAnalytics');
            navigate(`/dashboard`, { state: { quizData } });
        }
    };

    return (
        <div className="analytics-container">
            <h1>Quiz Analytics</h1>
            <div className="quiz-table">
                {analytics.quizzes.length === 0 ? (
                    <p style={{ color: 'red', fontSize: '2rem', fontFamily: 'sans-serif' }}>You haven't created any Quiz.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Quiz Name</th>
                                <th>Created On</th>
                                <th>Impression</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {analytics.quizzes.map((quiz, index) => (
                                <tr key={quiz?._id}>
                                    <td>{index + 1}</td>
                                    <td>{quiz?.quizName}</td>
                                    <td>{formatCreatedAt(quiz?.createdAt)}</td>
                                    <td>{quiz?.views}</td>
                                    <td>
                                        <img src={updateImage} alt="icon" />
                                        <img
                                            src={deleteImage}
                                            alt="icon"
                                            onClick={() => handleDelete(quiz?._id)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <img src={shareImage} onClick={() => handleShare(quiz?._id)} alt="icon" />
                                    </td>
                                    <td className='question' onClick={() => handleQuestionAnalysis(quiz?._id)}>Question Wise Analysis</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default Analytics
