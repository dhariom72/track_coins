import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from './coins.slice';
import historyReducer from './history.slice';

const store = configureStore({
    reducer: {
        coins: coinsReducer,
        history: historyReducer
    }
});

export default store;