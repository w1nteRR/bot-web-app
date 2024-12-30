import { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useGetNotificationsQuery } from '../hooks/queries/notifications/useGetNotificationsQuery'
import { Pages } from '../types/navigation/navigation.types'
import { SpinLoader } from '../components/ui/loaders/spin-loader'

export const NotificationsLayout: FC = () => {
  const { data, isLoading, isError } = useGetNotificationsQuery()

  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) return

    if (!data?.length) {
      navigate(Pages.NotificationsSelector)

      return
    }

    navigate(Pages.NotificationsSettings)
  }, [isLoading, data])

  if (isLoading) return <SpinLoader fullscreen />

  return <Outlet />
}
