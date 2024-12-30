import { useQuery } from 'react-query'

import { NotificationsApi } from '../../../api/notifications.api'
import { useFavoritesContext } from '../../context/useFavoritesContext'
import { useWebAppUserContext } from '../../context/useWebAppUserContext'

const key = 'notifications'
export const useGetNotificationsQuery = () => {
  const { user } = useWebAppUserContext()
  const { favorites } = useFavoritesContext()

  return useQuery([key], () => NotificationsApi.getNotifications(user?.id!), {
    retry: 0,
    select: ({ data: notification }) => {
      const notificationIds = notification?.ids || []

      return favorites.filter((favorite) =>
        notificationIds.includes(Number(favorite.id)),
      )
    },
  })
}
