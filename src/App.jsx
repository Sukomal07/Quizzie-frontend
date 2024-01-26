import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import HomeLayout from './layout/HomeLayout'
import Auth from './pages/auth/Auth'
import Quiz from './pages/quiz_interface/Quiz'


function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const accessToken = document.cookie.includes('accessToken');

  useEffect(() => {
    if (accessToken && (location.pathname === '/')) {
      navigate('/dashboard')
    }
    if (!accessToken) {
      navigate('/')
    }
  }, [accessToken, location.pathname, navigate])

  return (
    <>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/dashboard' element={<HomeLayout />} />
        <Route path='/quiz/:quizId' element={<Quiz />} />
      </Routes>
    </>
  )
}

export default App
