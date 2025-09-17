import { createSlice } from "@reduxjs/toolkit";

const preferenceSlice = createSlice({
    name: "preference",
    initialState: null,
    reducers: {
        addPreference: (state, action) => {
            return action.payload
        },
        removePreference: (state, action) => {
            return null
        }
    }
})

export const { addPreference, removePreference } = preferenceSlice.actions
export default preferenceSlice.reducer