import { useMutation, useQueryClient } from 'react-query'

import { useTelegram } from '../telegram/useTelegram'
import { NotificationsApi } from '../../api/notifications.api'
import { useCallback } from 'react'

export const useNotifications = () => {
  const {
    initDataUnsafe: { user },
    showAlert,
  } = useTelegram()

  const queryClient = useQueryClient()

  const mutation = useMutation(NotificationsApi.createNotifications, {
    retry: 0,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  })

  const create = useCallback(async (ids: string[]) => {
    if (!user?.id) return

    const account_id = String(user.id)
    const numberIds = ids.map(Number)

    const promises = numberIds.map(async (accountId, index) => {
      const currentTimestamp = Date.now()
      const timeOffset = index + 1
      const last_time_visited = currentTimestamp + timeOffset * 10000

      mutation.mutate({
        account_id,
        last_time_visited,
        ids: [accountId],
      })
    })

    try {
      await Promise.all(promises)
    } catch (error) {
      console.log('error')
      showAlert('Something went wrong.')
    }
  }, [])
  return {
    create,
  }
}
