import { configureStore } from '@reduxjs/toolkit'

import AnalyticsSlice from './slices/AnalyticsSlice'
import AuthSlice from './slices/AuthSlice'
import TrendingSlice from './slices/TrendingSlice'

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        trendingQuiz: TrendingSlice,
        analyticsSlice: AnalyticsSlice
    },
    devTools: true
})

export default store