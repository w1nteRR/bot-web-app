import { useMutation } from 'react-query'

import { telegramApi } from '../../api/telegram.api'
import { IProfilePayload } from '../../types/api/profile.request'

export const useProfile = () => {
  const { isLoading, mutateAsync, mutate, error, data } = useMutation(
    ['profile picture'],
    (data: IProfilePayload) => telegramApi.getMyProfilePicture(data),
    {
      // onSuccess: (data) => {
      //   setAvatar(data.data.profile_picture)
      // },
    }
  )

  return {
    isLoading,
    mutateAsync,
    mutate,
    error,
    data: data?.data,
  }
}
