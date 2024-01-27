import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { Pages } from '../../types/navigation/navigation.types'

export const Tracking: FC = () => {

  const { themeParams } = useTelegram()
  const navigate = useNavigate()


  const handleButtonClick = () => {
    navigate(Pages.Notifications)
  }

  return (
    <div className='mx-3 mt-6 rounded-xl' style={{ backgroundColor: themeParams.secondary_bg_color }}>
      <button className='p-4 rounded-xl w-full h-full flex' onClick={handleButtonClick}>
        <span style={{ color: themeParams.text_color }}>Notifications</span>
      </button>
    </div>

  )
}