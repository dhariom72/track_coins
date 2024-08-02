import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCoins } from '../api/coins.service'

export const fetchCoins = createAsyncThunk(
    'coins',
    async (_,  { rejectWithValue }) => {
      try{
        const response = await getCoins();
        return response.data;
      }
      catch(error){
        return rejectWithValue(error.response.data);
      }
    },
)

const initialState = {
  data : [],
  loading : false,
  error : "",
  selectedCoin: null
}

const coins = createSlice({
    name: 'coinsSlice',
    initialState,
    reducers: {
      setSelectedCoin: (state, action) => {
        state.selectedCoin = action.payload;
      } 
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchCoins.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    }
})

export const getCoinsSelector = (state) => state.coins;

export const { setSelectedCoin } = coins.actions;
export default coins.reducer;