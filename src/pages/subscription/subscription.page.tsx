import { createElement, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  IoCheckmarkCircleSharp,
  IoNotificationsCircleSharp,
} from 'react-icons/io5'
import { HiArchiveBox } from 'react-icons/hi2'
import { TbMultiplier2X } from 'react-icons/tb'
import { SiAdblock } from 'react-icons/si'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useSubscriptionMainButton } from '../../hooks/subscription/useSubscriptionMainButton'
import { useBackButton } from '../../hooks/telegram/useBackButton'

export const SubscriptionPage: FC = () => {
  const { themeParams, openInvoice } = useTelegram()
  const navigate = useNavigate()

  useSubscriptionMainButton()
  useBackButton(() => navigate(-1))

  const { text_color, secondary_bg_color, hint_color, link_color } = themeParams

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
        className='mt-10 py-3 px-5 flex rounded-xl mx-1'
        style={{ backgroundColor: secondary_bg_color }}
      >
        <div className='mr-2'>
          <IoCheckmarkCircleSharp size={30} color={link_color} />
        </div>

        <div className='flex justify-between items-center w-full'>
          <p className='font-bold' style={{ color: text_color }}>
            Monthly
          </p>
          <p style={{ color: hint_color }}>2,49 US$/month</p>
        </div>
      </div>

      <div className='mt-10 mx-2'>
        <span
          className='uppercase text-sm'
          style={{ color: themeParams.hint_color }}
        >
          What's included
        </span>
      </div>
      <div
        className='py-5 px-4 rounded-xl m-2 flex flex-col gap-5'
        style={{ backgroundColor: secondary_bg_color }}
      >
        {sections.map((section, index) => (
          <div className='flex gap-2.5' key={index}>
            <div>
              {createElement(section.icon, {
                size: iconSize[index],
                color: link_color,
              })}
            </div>

            <div className='flex flex-col gap-1.5'>
              <p className='font-bold' style={{ color: text_color }}>
                {section.title}
              </p>
              <p className='text-sm' style={{ color: hint_color }}>
                {section.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const sections = [
  {
    title: 'Notifications',
    description:
      'Stay effortlessly connected and in the loop with our innovative notification feature.',
    icon: IoNotificationsCircleSharp,
  },
  {
    title: 'Increased Usage Limits',
    description:
      'Elevate your journey by expanding your reach to up to 50 favorite accounts and monitoring 5 tracking accounts simultaneously',
    icon: TbMultiplier2X,
  },
  {
    title: 'Cloud Archive',
    description:
      'Your digital vault for preserving the essence of your journey through captivating user stories and cherished photos',
    icon: HiArchiveBox,
  },
  {
    title: 'Ad-free',
    description:
      'Premium subscribers might enjoy an ad-free experience while using the bot`s interface.',
    icon: SiAdblock,
  },
]

const iconSize = [30, 30, 28, 25]
