import { useMutation } from 'react-query'

import { telegramApi } from '../../api/telegram.api'
import { IProfilePayload } from '../../types/api/profile.request'

export const useProfile = () => {
  const { isLoading, mutateAsync, error, data } = useMutation(
    'get profile picture',
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
    error,
    data: data?.data,
  }
}
