import { createSlice } from "@reduxjs/toolkit";
import { defaultSideChesses } from "./states";
const chessData = JSON.parse(localStorage.getItem('chesses')) || defaultSideChesses

export const chessSlice = createSlice({
    name: 'chess',
    initialState: chessData,
    reducers: {
        move: (state, action) => {
            const { activeId, x, y } = action.payload
            for(const chess of state) {
                if(chess.isAlive) {
                    if(chess.id == activeId) {
                        chess.positionX = x
                        chess.positionY = y
                    }
                }
            }
            return state
        },
        remove: (state, action) => {
            for(const chess of state) {
                if(chess.id == action.payload) {
                    chess.isAlive = false
                }
            }
            return state
        }
    }
})