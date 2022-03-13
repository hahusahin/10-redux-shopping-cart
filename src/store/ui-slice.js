import { createSlice } from "@reduxjs/toolkit"

const initialUIState = { isShown: false, notification: null }

const uiSlice = createSlice({
   name: "toggleCart",
   initialState: initialUIState,
   reducers: {
      toggle(state){
         state.isShown = !state.isShown
      },
      showNotification(state, action){
         state.notification = action.payload
      }
   }
})

export const uiActions = uiSlice.actions

export default uiSlice