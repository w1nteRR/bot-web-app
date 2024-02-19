import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { AiFillDollarCircle } from 'react-icons/ai'
import { CgSpinnerTwoAlt } from 'react-icons/cg'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { Pages } from '../../types/navigation/navigation.types'

export const SubscriptionButton: FC = () => {
  const { themeParams } = useTelegram()
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate(Pages.Subscription)
  }

  return (
    <div
      className='mx-3 rounded-b-xl'
      style={{ backgroundColor: themeParams.secondary_bg_color }}
    >
      <button
        className='p-4 w-full h-full flex items-center gap-2'
        onClick={handleButtonClick}
      >
        <AiFillDollarCircle size={29} color={themeParams.link_color} />

        <span className='font-medium' style={{ color: themeParams.text_color }}>
          Subscription
        </span>

        {false ? (
          <CgSpinnerTwoAlt
            className='animate-spin justify-self-end ml-auto'
            color={themeParams.link_color}
            size={18}
          />
        ) : (
          <IoChevronForwardOutline
            className='justify-self-end ml-auto'
            color={themeParams.hint_color}
          />
        )}
      </button>
    </div>
  )
}
