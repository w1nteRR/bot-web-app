import { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useWebAppUserContext } from '../hooks/context/useWebAppUserContext'
import { Pages } from '../types/navigation/navigation.types'

export const SubscriptionLayout: FC = () => {
  const { user } = useWebAppUserContext()

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return

    if (user.is_subscriber) {
      navigate(Pages.SubscriptionPaid)

      return
    }

    navigate(Pages.SubscriptionCheckout)
  }, [user])

  return <Outlet />
}
