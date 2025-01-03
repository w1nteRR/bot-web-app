import { createElement } from 'react'

import { IoNotificationsCircleSharp } from 'react-icons/io5'
import { TbMultiplier2X } from 'react-icons/tb'
import { HiArchiveBox } from 'react-icons/hi2'
import { SiAdblock } from 'react-icons/si'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useTranslation } from 'react-i18next'

export const SubscriptionFeatures = () => {
  const { themeParams } = useTelegram()
  const { link_color, text_color, subtitle_text_color } = themeParams
  const { t } = useTranslation()

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
              {t(`subscription.features.${section.key}.title`)}
            </p>
            <p className='text-sm' style={{ color: subtitle_text_color }}>
              {t(`subscription.features.${section.key}.description`)}
            </p>
          </div>
        </div>
      ))}
    </>
  )
}

const sections = [
  {
    key: 'notifications',
    icon: IoNotificationsCircleSharp,
  },
  {
    key: 'increasedUsage',
    icon: TbMultiplier2X,
  },
  {
    key: 'adFree',
    title: 'Ad-free',
    icon: SiAdblock,
  },
]

const iconSize = [30, 30, 28, 25]

// {
//   title: 'Cloud Archive',
//   description:
//     'Your digital vault for preserving the essence of your journey through captivating user stories and cherished photos',
//   icon: HiArchiveBox,
// },
