import '../styles/HomeLayout.css'

import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../redux/slices/AuthSlice';

function HomeLayout({ children }) {
    const dispatch = useDispatch();
    async function onLogout() {
        await dispatch(logout())
    }
    return (
        <div className='homelayout'>
            <div className='layout-container'>
                <div className="sidebar">
                    <Link to={'/dashboard'} className='title'>QUIZZIE</Link>
                    <div className='sidebar-menu'>
                        <span>Dashboard</span>
                        <span>Analytics</span>
                        <span>Create Quiz</span>
                    </div>
                    <div className='logout'>
                        <hr />
                        <span onClick={onLogout}>Logout</span>
                    </div>
                </div>
                <div className="right"></div>
            </div>
            {children}
        </div>
    )
}

export default HomeLayout
