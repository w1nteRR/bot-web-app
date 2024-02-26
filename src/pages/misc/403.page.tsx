import { FC } from 'react'
import { useTelegram } from '../../hooks/telegram/useTelegram'

export const NotAuthorizedPage: FC = () => {
  const { themeParams } = useTelegram()

  const { text_color } = themeParams

  return (
    <div>
      <p style={{ color: text_color }}>Not auth</p>
    </div>
  )
}
