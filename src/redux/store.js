import { configureStore } from "@reduxjs/toolkit";
import { chessSlice } from "./slices/chessSlice";

export const store = configureStore({
    reducer: {
        chess: chessSlice.reducer
    }
})