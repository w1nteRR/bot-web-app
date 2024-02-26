import { useEffect } from 'react'
import { useTelegram } from '../telegram/useTelegram'
import { useMutation } from 'react-query'
import { subscriptionApi } from '../../api/subscription.api'

export const useSubscriptionMainButton = () => {
  const {
    MainButton,
    onEvent,
    offEvent,
    initDataUnsafe: { user },
    close,
  } = useTelegram()
  const mutation = useMutation(subscriptionApi.configureInvoice)

  const handleMainButtonPress = async () => {
    if (!user?.id) return

    await mutation.mutateAsync({ account_id: String(user.id) })

    close()
  }

  useEffect(() => {
    MainButton.setText('Checkout for 2,49 US$ / month')
    MainButton.show()
  }, [])

  useEffect(() => {
    if (mutation.isLoading) {
      MainButton.showProgress()

      return
    }

    MainButton.hideProgress()
  }, [mutation.isLoading])

  useEffect(() => {
    onEvent('mainButtonClicked', handleMainButtonPress)

    return () => {
      offEvent('mainButtonClicked', handleMainButtonPress)
    }
  }, [])
}
