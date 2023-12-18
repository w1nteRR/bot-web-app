import { PopupButton, PopupParams } from '@twa-dev/types'
import { NavigateFunction } from 'react-router-dom'
// import i18next from 'react-i18next'
import i18next from 'i18next'
import { Pages } from '../types/navigation/navigation.types'

export const showRecentListPopupError = (
  navigate: NavigateFunction,
  username: string
) => {
  const buttons: PopupButton[] = [
    { id: '1', type: 'default', text: i18next.t('navigation.profile') },
    { id: '2', type: 'destructive', text: i18next.t('navigation.close') },
  ]

  const params: PopupParams = {
    message: i18next.t('common.storiesNotFound'),
    buttons: buttons,
  }

  return window.Telegram.WebApp.showPopup(params, (id) => {
    if (id === '1') {
      return navigate(`${Pages.User.replace(':username', username)}`, {
        state: { from: location.pathname },
      })
    }
  })
}
