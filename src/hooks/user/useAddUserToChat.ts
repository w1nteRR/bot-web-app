import { useCallback } from 'react'
import { useMutation } from 'react-query'
import { telegramApi } from '../../api/telegram.api'
import { IUserSendChatPayload } from '../../types/api/user.payload'
import { useTelegram } from '../telegram/useTelegram'

export const useAddUserToChat = () => {
  const { mutateAsync } = useMutation(
    'add user chat',
    (data: IUserSendChatPayload) => telegramApi.addUserToBotChat(data)
  )

  const { initDataUnsafe, HapticFeedback } = useTelegram()

  const addUserToChat = useCallback(
    async (username: string, full_name: string) => {
      if (!initDataUnsafe.user) return

      await mutateAsync({
        userId: initDataUnsafe.user?.id,
        username,
        full_name,
      })

      HapticFeedback.notificationOccurred('success')
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initDataUnsafe]
  )

  return {
    addUserToChat,
  }
}
