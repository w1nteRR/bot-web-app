import { createElement } from 'react'

import { IoNotificationsCircleSharp } from 'react-icons/io5'
import { TbMultiplier2X } from 'react-icons/tb'
import { HiArchiveBox } from 'react-icons/hi2'
import { SiAdblock } from 'react-icons/si'

import { useTelegram } from '../../hooks/telegram/useTelegram'

export const SubscriptionFeatures = () => {
  const { themeParams } = useTelegram()
  const { link_color, text_color, subtitle_text_color } = themeParams

  return (
    <>
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
            <p className='text-sm' style={{ color: subtitle_text_color }}>
              {section.description}
            </p>
          </div>
        </div>
      ))}
    </>
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
      `Elevate your journey by expanding your reach to up to 25 favorite accounts and monitoring 8 tracking accounts simultaneously`,
    icon: TbMultiplier2X,
  },
  // {
  //   title: 'Cloud Archive',
  //   description:
  //     'Your digital vault for preserving the essence of your journey through captivating user stories and cherished photos',
  //   icon: HiArchiveBox,
  // },
  {
    title: 'Ad-free',
    description:
      'Premium subscribers might enjoy an ad-free experience while using the bot`s interface.',
    icon: SiAdblock,
  },
]

const iconSize = [30, 30, 28, 25]
