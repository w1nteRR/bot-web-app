import { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useGetNotificationsQuery } from '../hooks/queries/notifications/useGetNotificationsQuery'
import { Pages } from '../types/navigation/navigation.types'

export const NotificationsLayout: FC = () => {
  const { data, isLoading, isError } = useGetNotificationsQuery()

  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) return

    if (!data?.length || isError) {
      navigate(Pages.NotificationsSelector)

      return
    }

    navigate(Pages.NotificationsSettings)
  }, [isLoading, data?.length, isError])

  return <Outlet />
}
