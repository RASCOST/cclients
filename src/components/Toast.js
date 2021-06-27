import { ToastAndroid } from 'react-native'

/**
 * Show succes Toast with the filled message
 * @param {*} msg  string with the message to show
 */
export const showToastSuccess = (msg) => {
  return ToastAndroid.showWithGravity(
    msg,
    10,
    ToastAndroid.CENTER
  )
}

/**
 * Show error Toast with the filled message
 * @param {*} msg  string with the message to show
 * @returns
 */
export const showToastError = (msg) => {
  return ToastAndroid.showWithGravity(
    msg,
    10,
    ToastAndroid.CENTER
  )
}