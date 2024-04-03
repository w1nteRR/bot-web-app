import { useState } from 'react'
import { useTelegram } from '../telegram/useTelegram'

export const useNotificationsSettings = () => {
  const [silent, setSilent] = useState(false)

  const { HapticFeedback } = useTelegram()

  const toggleMode = () => {
    setSilent(!silent)

    HapticFeedback.selectionChanged()
  }

  return {
    toggleMode,
    silent,
  }
}
