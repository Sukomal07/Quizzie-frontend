import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
function RequiredAuth() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    return isLoggedIn ? (
        <Outlet />
    ) : isLoggedIn ? <Navigate to={'/dashboard'} /> : <Navigate to={'/'} />
}

export default RequiredAuth
