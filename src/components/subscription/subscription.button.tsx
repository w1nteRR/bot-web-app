import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { AiFillDollarCircle } from 'react-icons/ai'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { Pages } from '../../types/navigation/navigation.types'
import { useTranslation } from 'react-i18next'

export const SubscriptionButton: FC = () => {
  const { themeParams } = useTelegram()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleButtonClick = () => {
    navigate(Pages.Subscription)
  }

  return (
    <div
      className='mx-3 rounded-b-xl'
      style={{ backgroundColor: themeParams.section_bg_color }}
    >
      <button
        className='p-4 w-full h-full flex items-center gap-2'
        onClick={handleButtonClick}
      >
        <AiFillDollarCircle size={34} color={themeParams.link_color} />

        <span className='font-medium' style={{ color: themeParams.text_color }}>
          {t('navigation.subscription')}
        </span>

        {
          <IoChevronForwardOutline
            className='justify-self-end ml-auto'
            color={themeParams.hint_color}
          />
        }
      </button>
    </div>
  )
}
