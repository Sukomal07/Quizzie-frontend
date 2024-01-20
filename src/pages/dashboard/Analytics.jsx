import '../../styles/Analytics.css'

import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import deleteImage from '../../assets/deleteImage.svg'
import shareImage from '../../assets/shareImage.svg'
import updateImage from '../../assets/updateImage.svg'
import { getAnalytics } from '../../redux/slices/AnalyticsSlice'
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL

function Analytics() {
    const dispatch = useDispatch()
    const analytics = useSelector((state) => state.analyticsSlice);

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

    const handleShare = (quizId) => {
        const quizUrl = `${FRONTEND_URL}/quiz/${quizId}`;
        navigator.clipboard.writeText(quizUrl);
        toast.success('Link copied to clipboard!');
    };

    return (
        <div className="analytics-container">
            <h1>Quiz Analytics</h1>
            <div className="quiz-table">
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
                            <tr key={quiz._id}>
                                <td>{index + 1}</td>
                                <td>{quiz.quizName}</td>
                                <td>{formatCreatedAt(quiz.createdAt)}</td>
                                <td>{quiz.views}</td>
                                <td>
                                    <img src={updateImage} alt="icon" />
                                    <img src={deleteImage} alt="icon" />
                                    <img src={shareImage} onClick={() => handleShare(quiz._id)} alt="icon" />
                                </td>
                                <td className='question'>Question Wise Analysis</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Analytics
