import { useEffect } from 'react'
import { useTelegram } from '../telegram/useTelegram'

export const useSubscriptionMainButton = () => {
  const { MainButton, onEvent, offEvent } = useTelegram()

  const handleMainButtonPress = async () => {}

  useEffect(() => {
    MainButton.setText('Checkout for 2,49 US$ / month')
    MainButton.show()
  }, [])

  useEffect(() => {
    onEvent('mainButtonClicked', handleMainButtonPress)

    return () => {
      offEvent('mainButtonClicked', handleMainButtonPress)
    }
  }, [])
}
