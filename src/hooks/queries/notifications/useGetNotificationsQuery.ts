import { useQuery } from 'react-query'

import { useTelegram } from '../../telegram/useTelegram'
import { useFavorites } from '../../favorites/useFavorites'

import { NotificationsApi } from '../../../api/notifications.api'

const key = 'notifications'
export const useGetNotificationsQuery = () => {
  const {
    initDataUnsafe: { user },
  } = useTelegram()

  const { list: favorites } = useFavorites()

  return useQuery([key], () => NotificationsApi.getNotifications(user?.id!), {
    retry: false,
    select: (data) => {
      const notificationIds = data.data.ids

      return favorites.filter((favorite) =>
        notificationIds.includes(Number(favorite.id)),
      )
    },
  })
}
