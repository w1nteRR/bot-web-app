import { FC } from 'react'
import { useNavigate } from 'react-router-dom'


import { SubscriptionFeatures } from '../../components/subscription/subscription-features'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useSubscriptionMainButton } from '../../hooks/subscription/useSubscriptionMainButton'
import { useBackButton } from '../../hooks/telegram/useBackButton'
import { Pages } from '../../types/navigation/navigation.types'

import starIcon from '../../assets/telegram-star.svg'

export const SubscriptionPage: FC = () => {
  const { themeParams } = useTelegram()
  const navigate = useNavigate()

  useSubscriptionMainButton()
  useBackButton(() => navigate(Pages.Home))

  const { text_color, hint_color, link_color, section_bg_color } = themeParams

  return (
    <div className='px-3 py-5'>
      <div className='flex flex-col gap-3.5'>
        <h1
          className='text-4xl font-bold text-center'
          style={{ color: text_color }}
        >
          Premium Subscription
        </h1>
        <p
          className='text-center font-medium text-md'
          style={{ color: themeParams.text_color }}
        >
          Unlock exclusive features & elevate Your experience
        </p>
      </div>

      <div
        className='mt-10 py-3 px-5 flex justify-center items-center rounded-xl mx-1'
        style={{ backgroundColor: section_bg_color }}
      >
        {/*<div className='mr-2'>*/}
        {/*  <IoCheckmarkCircleSharp size={30} color={link_color} />*/}
        {/*</div>*/}

        <div className='flex justify-between items-center w-full'>
          <div>
            <p className="font-semibold" style={{ color: text_color }}>
              Monthly Subscription
            </p>
            <p style={{ color: hint_color }}>
             Premium Access
            </p>
          </div>

          <div className="flex flex-row items-center gap-1.5">
            <p className="font-semibold" style={{ color: text_color }}>100 / <span style={{ color: hint_color }} className='font-medium'>mo</span></p>
            <img src={starIcon} alt='star' />
          </div>
        </div>
      </div>

      <div className='mt-10 mx-2'>
        <span
          className='uppercase text-sm'
          style={{ color: themeParams.section_header_text_color }}
        >
          What's included
        </span>
      </div>
      <div
        className='py-5 px-4 rounded-xl m-2 flex flex-col gap-5'
        style={{ backgroundColor: section_bg_color }}
      >
        <SubscriptionFeatures />
      </div>
    </div>
  )
}
