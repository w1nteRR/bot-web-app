import { useEffect } from 'react'
import { useTelegram } from './useTelegram'

type useBackButtonType = (onBackButtonClick: () => void) => void

export const useBackButton: useBackButtonType = (callback) => {
  const tg = useTelegram()

  useEffect(() => {
    tg.BackButton.show()
    tg.BackButton.onClick(callback)

    return () => {
      tg.BackButton.hide()
      tg.BackButton.offClick(callback)
    }
  }, [])
}
