import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { ScrapperApi } from '../../api/scrapper.api'
import { useRecent } from '../recent/useRecent'
import { useTelegram } from '../telegram/useTelegram'

export const useUser = (username: string) => {
  const navigate = useNavigate()
  const tg = useTelegram()

  const { addUserToRecent } = useRecent()

  const { isLoading, data, refetch, error } = useQuery(
    ['user info', username],
    () => ScrapperApi.findUserByUsername(username),
    {
      // enabled: false,
      retry: 0,
      onSuccess: (data) => {
        const { username, pk_id, profile_image, full_name } = data.data

        addUserToRecent({
          username,
          pk_id,
          profile_image,
          full_name,
          timestamp: Date.now(),
        })
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          tg.HapticFeedback.notificationOccurred('error')
          tg.showAlert(error.response?.data.message, () => navigate(-1))
        }
      },
    }
  )

  return {
    isLoading,
    data: data?.data,
    refetch,
  }
}
