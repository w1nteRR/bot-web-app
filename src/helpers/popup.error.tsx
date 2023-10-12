import { PopupButton, PopupParams } from '@twa-dev/types'
import { NavigateFunction } from 'react-router-dom'
import { Pages } from '../types/navigation/navigation.types'

const buttons: PopupButton[] = [
  { id: '1', type: 'default', text: 'Go to profile' },
  { id: '2', type: 'destructive', text: 'Close' },
]

const params: PopupParams = {
  message: 'Stories not found.',
  buttons: buttons,
}

export const showRecentListPopupError = (
  navigate: NavigateFunction,
  username: string
) => {
  return window.Telegram.WebApp.showPopup(params, (id) => {
    if (id === '1') {
      return navigate(`${Pages.User.replace(':username', username)}`, {
        state: { from: location.pathname },
      })
    }
  })
}
