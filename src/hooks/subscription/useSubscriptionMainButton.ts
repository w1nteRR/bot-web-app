import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { InvoiceStatuses } from '@twa-dev/types'

import { useTelegram } from '../telegram/useTelegram'
import { useWebAppUserContext } from '../context/useWebAppUserContext'
import { subscriptionApi } from '../../api/subscription.api'
import { Pages } from '../../types/navigation/navigation.types'
import { useTranslation } from 'react-i18next'

export const useSubscriptionMainButton = () => {
  const {
    MainButton,
    onEvent,
    offEvent,
    openTelegramLink,
    openInvoice,
    setHeaderColor,
  } = useTelegram()
  const { user, updateSubscriptionStatus } = useWebAppUserContext()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const {
    mutateAsync: configureInvoice,
    isLoading: isConfigureInvoiceLoading,
  } = useMutation(subscriptionApi.configureInvoice)

  const handleInvoicePaid = (status: InvoiceStatuses) => {
    if (status === 'paid') {
      updateSubscriptionStatus(true)
      navigate(`${Pages.Subscription}/${Pages.SubscriptionPaid}`, {
        replace: true,
      })
    }
  }

  const handleMainButtonPress = async () => {
    if (!user?.id) return

    await configureInvoice(
      { account_id: String(user.id) },
      {
        onSuccess: ({ data }) => {
          openInvoice(data.invoiceLink, handleInvoicePaid)
        },
      },
    )
  }

  useEffect(() => {
    MainButton.setText(t('subscription.mainButton'))
    MainButton.show()

    return () => {
      MainButton.text
      MainButton.hide()
    }
  }, [])

  useEffect(() => {
    if (isConfigureInvoiceLoading) {
      MainButton.showProgress()

      return
    }

    MainButton.hideProgress()
  }, [isConfigureInvoiceLoading])

  useEffect(() => {
    onEvent('mainButtonClicked', handleMainButtonPress)

    return () => {
      offEvent('mainButtonClicked', handleMainButtonPress)
    }
  }, [])
}
