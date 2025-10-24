import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotification(state, action) {
      return action.payload
    },

    clearNotification() {
      return ''
    }
  }
})

export const setNotification = (text, displayTime) => {
  return async dispatch => {
    dispatch(createNotification(text))
    setTimeout(() => {
      dispatch(clearNotification())
    }, displayTime)
  }
}
export const { clearNotification, createNotification } = notificationSlice.actions
export default notificationSlice.reducer