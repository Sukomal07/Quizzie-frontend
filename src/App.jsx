import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import HomeLayout from './layout/HomeLayout'
import Auth from './pages/auth/Auth'


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
        <Route path='/dashboard' element={<HomeLayout />} />
      </Routes>
    </>
  )
}

export default App
