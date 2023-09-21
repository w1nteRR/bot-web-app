import { FC } from 'react'
import { useTelegram } from '../../hooks/telegram/useTelegram'

export const FavoritesPage: FC = () => {
  const { themeParams } = useTelegram()

  return <p style={{ color: themeParams.text_color }}>favorites page</p>
}
