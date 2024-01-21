import '../styles/HomeLayout.css'

import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import Analytics from '../pages/dashboard/Analytics'
import CreateQuiz from '../pages/dashboard/CreateQuiz'
import QuestionAnalytics from '../pages/dashboard/QuestionAnalytics';
import Trending from '../pages/dashboard/Trending'
import { resetAnalytics } from '../redux/slices/AnalyticsSlice'
import { logout } from '../redux/slices/AuthSlice';
import { resetTrending } from '../redux/slices/TrendingSlice';

function HomeLayout() {
    const [activeTab, setActiveTab] = useState('dashboard');

    const dispatch = useDispatch();

    function handleTabClick(tab) {
        setActiveTab(tab);
    }

    async function onLogout() {
        await dispatch(logout())
        await dispatch(resetTrending())
        await dispatch(resetAnalytics())
    }
    return (
        <div className='homelayout'>
            <div className='layout-container'>
                <div className="sidebar">
                    <Link to={'/dashboard'} className='title'>QUIZZIE</Link>
                    <div className='sidebar-menu'>
                        <span
                            className={activeTab === 'dashboard' ? 'tabActive' : ''}
                            onClick={() => handleTabClick('dashboard')}
                        >Dashboard</span>
                        <span
                            className={activeTab === 'analytics' ? 'tabActive' : ''}
                            onClick={() => handleTabClick('analytics')}
                        >Analytics</span>
                        <span
                            className={activeTab === 'createQuiz' ? 'tabActive' : ''}
                            onClick={() => handleTabClick('createQuiz')}
                        >Create Quiz</span>
                    </div>
                    <div className='logout'>
                        <hr />
                        <span onClick={onLogout}>Logout</span>
                    </div>
                </div>
                <div className="right">
                    {activeTab === 'dashboard' ? (
                        <Trending />
                    ) : activeTab === 'analytics' ? (
                        <Analytics setActiveTab={setActiveTab} />
                    ) : activeTab === 'questionAnalytics' ? (
                        <QuestionAnalytics />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            {activeTab === 'createQuiz' ? (
                <CreateQuiz setActiveTab={setActiveTab} />
            ) : (<></>)}
        </div>
    )
}

export default HomeLayout
