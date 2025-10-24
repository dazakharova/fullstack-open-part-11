import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './src/reducers/filterReducer.js'
import notificationReducer from './src/reducers/notificationReducer.js'
import anecdoteReducer from './src/reducers/anecdoteReducer.js'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

export default store