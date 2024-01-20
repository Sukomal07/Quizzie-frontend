import { configureStore } from '@reduxjs/toolkit'

import AuthSlice from './slices/AuthSlice'
import TrendingSlice from './slices/TrendingSlice'

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        trendingQuiz: TrendingSlice
    },
    devTools: true
})

export default store