import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  IoNotificationsCircleSharp,
  IoChevronForwardOutline,
} from 'react-icons/io5'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { Pages } from '../../types/navigation/navigation.types'

export const Tracking: FC = () => {
  const { themeParams, initDataUnsafe } = useTelegram()
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate(Pages.Notifications)
  }

  return (
    <div
      className='mx-3 mt-6 rounded-t-xl'
      style={{ backgroundColor: themeParams.section_bg_color }}
    >
      <button
        className='p-4 rounded-xl  w-full h-full flex items-center gap-2'
        onClick={handleButtonClick}
      >
        <IoNotificationsCircleSharp size={30} color={themeParams.link_color} />

        <span className='font-medium' style={{ color: themeParams.text_color }}>
          Notifications
        </span>

        <IoChevronForwardOutline
          className='justify-self-end ml-auto'
          color={themeParams.hint_color}
        />
      </button>
    </div>
  )
}
