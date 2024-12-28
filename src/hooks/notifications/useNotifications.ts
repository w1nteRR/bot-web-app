import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'

import { useTelegram } from '../telegram/useTelegram'
import { NotificationsApi } from '../../api/notifications.api'
import { Pages } from '../../types/navigation/navigation.types'

export const useNotifications = () => {
  const {
    initDataUnsafe: { user },
    showAlert,
  } = useTelegram()

  const queryClient = useQueryClient()

  const navigate = useNavigate()
  const mutation = useMutation(NotificationsApi.createNotifications, {
    retry: 0,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['notifications'])
      navigate(Pages.Notifications)
    },
  })

  const create = useCallback(async (ids: string[]) => {
    if (!user?.id) return

    const account_id = user.id
    const numberIds = ids.map(Number)

    try {
      mutation.mutate({
        account_id,
        ids: numberIds,
      })
    } catch (error) {
      console.log('error')
      showAlert('Something went wrong.')
    }
  }, [])
  return {
    create,
    isLoading: mutation.isLoading,
  }
}
