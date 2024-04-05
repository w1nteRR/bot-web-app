import { useCallback } from 'react'
import { useMutation, useQuery } from 'react-query'

import { useTelegram } from '../telegram/useTelegram'
import { NotificationsApi } from '../../api/notifications.api'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../../types/navigation/navigation.types'

export const useNotifications = () => {
  const {
    initDataUnsafe: { user },
    showAlert,
  } = useTelegram()

  const navigate = useNavigate()

  const mutation = useMutation(NotificationsApi.createNotifications, {
    retry: 0,
  })

  const { refetch } = useQuery(
    ['notifications'],
    () => NotificationsApi.getNotifications(user?.id!),
    {
      enabled: false,
      onSuccess: () => navigate(Pages.NotificationsSettings),
    },
  )

  const create = useCallback(async (ids: string[]) => {
    if (!user?.id) return

    const account_id = user.id
    const numberIds = ids.map(Number)

    const last_time_checked = Math.floor(Date.now() / 1000)

    mutation.mutate({
      account_id,
      last_time_checked,
      ids: numberIds,
    })

    await refetch()

    try {
      // await Promise.all(promises)
    } catch (error) {
      console.log('error')
      showAlert('Something went wrong.')
    }
  }, [])
  return {
    create,
  }
}
