import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCoins, getHistory } from '../api/coins.service'

export const fetchHistory = createAsyncThunk(
    'history',
    async (code,  { rejectWithValue }) => {
      try{
        const response = await getHistory(code);
        return response.data;
      }
      catch(error){
        return rejectWithValue(error.response.data);
      }
    },
)

const initialState = {
  data : []
}

const history = createSlice({
    name: 'historySlice',
    initialState,
    extraReducers: (builder) => {
      builder
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
    }
})

export const getHistorySelector = (state) => state.history.data;

export default history.reducer;