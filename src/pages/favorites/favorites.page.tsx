import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useBackButton } from '../../hooks/telegram/useBackButton'

export const FavoritesPage: FC = () => {
  const navigate = useNavigate()
  const { themeParams } = useTelegram()

  useBackButton(() => navigate(-1))

  return <p style={{ color: themeParams.text_color }}>favorites page</p>
}
