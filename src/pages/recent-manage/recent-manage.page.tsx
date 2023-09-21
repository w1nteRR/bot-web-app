import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useTelegram } from '../../hooks/telegram/useTelegram'

export const RecentManagePage: FC = () => {
  const navigate = useNavigate()
  const { themeParams } = useTelegram()

  useBackButton(() => navigate(-1))

  return (
    <>
      <div>
        <p style={{ color: themeParams.text_color }}>recent manage page</p>
      </div>
    </>
  )
}
