import { useEffect } from 'react'
import { useMutation } from 'react-query'

import { useTelegram } from '../telegram/useTelegram'
import { walletPayApi } from '../../api/wallet-pay.api'
import { useWebAppUserContext } from '../context/useWebAppUserContext'

export const useSubscriptionMainButton = () => {
  const { MainButton, onEvent, offEvent, openTelegramLink } = useTelegram()
  const { user } = useWebAppUserContext()

  const {
    mutateAsync: createOrder,
    data: order,
    isLoading: isCreateOrderLoading,
  } = useMutation(walletPayApi.createOrder)

  const handleMainButtonPress = async () => {
    if (!user?.id) return

    await createOrder(
      { user_id: user.id },
      {
        onSuccess: ({ data }) => {
          openTelegramLink(data.payLink)
        },
      },
    )
  }

  useEffect(() => {
    MainButton.setText('Checkout for 2,49 US$ / month')
    MainButton.show()
  }, [])

  useEffect(() => {
    if (isCreateOrderLoading) {
      MainButton.showProgress()

      return
    }

    MainButton.hideProgress()
  }, [isCreateOrderLoading])

  useEffect(() => {
    onEvent('mainButtonClicked', handleMainButtonPress)

    return () => {
      offEvent('mainButtonClicked', handleMainButtonPress)
    }
  }, [])
}
