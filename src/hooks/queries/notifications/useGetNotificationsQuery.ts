import { useQuery } from 'react-query'

import { useTelegram } from '../../telegram/useTelegram'

import { NotificationsApi } from '../../../api/notifications.api'
import { useFavoritesContext } from '../../context/useFavoritesContext'

const key = 'notifications'
export const useGetNotificationsQuery = () => {
  const {
    initDataUnsafe: { user },
  } = useTelegram()

  const { favorites } = useFavoritesContext()

  return useQuery([key], () => NotificationsApi.getNotifications(user?.id!), {
    retry: 1,
    staleTime: Infinity,
    select: (data) => {
      const notificationIds = data.data.ids

      return favorites.filter((favorite) =>
        notificationIds.includes(Number(favorite.id)),
      )
    },
  })
}
