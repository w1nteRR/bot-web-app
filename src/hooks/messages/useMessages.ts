import { useMutation, useQuery } from 'react-query'

import { useFavoritesContext } from '../context/useFavoritesContext'
import { useWebAppUserContext } from '../context/useWebAppUserContext'
import { MessagesApi } from '../../api/messages.api'
import { NotificationsApi } from '../../api/notifications.api'
import { Commands } from '../../types/messages/messages.types'

export const useMessages = () => {
  const { user } = useWebAppUserContext()
  const { verifyFavorites } = useFavoritesContext()

  const { data: notifications, isSuccess } = useQuery('notifications', () =>
    NotificationsApi.getNotifications(user?.id!),
  )

  const deleteMessageMutation = useMutation('messages', () =>
    MessagesApi.deleteMessage(user?.id!),
  )

  useQuery('messages', () => MessagesApi.getMessages(user?.id!), {
    onSuccess: ({ data }) => readMessages(data.command),
    enabled: isSuccess,
  })

  const readMessages = async (commands: Commands) => {
    switch (commands) {
      case 'RESET_FAVORITES':
        await verifyFavorites(notifications?.data.ids || [])
        await deleteMessageMutation.mutateAsync()

        break
      default:
        console.log('READ_DONE')
    }
  }
}
