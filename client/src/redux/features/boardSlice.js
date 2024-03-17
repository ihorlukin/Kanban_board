import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import boardApi from '../../api/boardApi';

const initialState = { 
  boards: [],
  favouriteList: [],
}

export const deleteBoardAsync = createAsyncThunk(
  "board/deleteBoard",
  async ({boardId, isFavourite}, {dispatch, rejectWithValue}) => {
    try {
        const res = await boardApi.delete(boardId);
        dispatch(deleteBoard({id: boardId, isFavourite}))
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
);
export const boardSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload
    },
    addBoard: (state, action) => {
      state.boards = [...state.boards, action.payload]
    },
    setFavouriteList: (state, action) => {
      state.favouriteList = action.payload
    },
    deleteBoard: (state, action) => {
      state.boards = state.boards.filter(board => board.id !== action.payload.id)
      if(action.payload.isFavourite){
        state.favouriteList = state.favouriteList.filter(board => board.id !== action.payload.id)
      }
    }
  },
})

export const { 
  setBoards, 
  deleteBoard, 
  setFavouriteList, 
  addBoard,
} = boardSlice.actions

export default boardSlice.reducer