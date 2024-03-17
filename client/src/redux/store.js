import { configureStore } from "@reduxjs/toolkit"
import userReducer from './features/userSlice'
import boardReducer from './features/boardSlice'
import sectionReducer from './features/sectionSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    section: sectionReducer,
  }
})