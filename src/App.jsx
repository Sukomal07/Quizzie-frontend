import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'

import HomeLayout from './layout/HomeLayout'
import Auth from './pages/auth/Auth'
import Quiz from './pages/quiz_interface/Quiz'


function App() {
  const navigate = useNavigate()

  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard')
    }
  }, [isLoggedIn, navigate])

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
