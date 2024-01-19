import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import Auth from './pages/auth/Auth'
import Home from './pages/dashboard/Home'


function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn && (location.pathname === '/')) {
      navigate('/dashboard')
    }
    if (!isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, location.pathname, navigate])

  return (
    <>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/dashboard' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
