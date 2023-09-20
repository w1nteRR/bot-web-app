import { FC, cloneElement } from 'react'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { AiOutlineHistory } from 'react-icons/ai'
import { BiChevronRight } from 'react-icons/bi'

import { useTelegram } from '../../hooks/telegram/useTelegram'

const menu = [
  {
    label: 'Favorites',
    icon: <MdOutlineFavoriteBorder />,
    size: 25,
    rightLabel: '4',
  },
  {
    label: 'Recent activity',
    icon: <AiOutlineHistory />,
    size: 25,
  },
  // {
  //   label: 'Tracking',
  //   icon: <AiOutlineHistory />,
  //   size: 25,
  // },
]

export const Menu: FC = () => {
  const { themeParams } = useTelegram()

  return (
    <div
      className='mt-20 mx-5 rounded-xl'
      style={{ backgroundColor: themeParams.bg_color }}
    >
      {menu.map((item, index) => (
        <div
          key={index}
          className='flex items-center py-2 px-4 active:opacity-80'
        >
          {cloneElement(item.icon, {
            size: item.size,
            color: themeParams.link_color,
          })}
          <p
            style={{ color: themeParams.text_color }}
            className='divide-y divide-blue-200 p-2 w-full '
          >
            {item.label}
          </p>
          <div className='flex items-center'>
            {item.rightLabel && (
              <p className='text-sm' style={{ color: themeParams.hint_color }}>
                {item.rightLabel}
              </p>
            )}

            <BiChevronRight size={25} color={themeParams.hint_color} />
          </div>
        </div>
      ))}
    </div>
  )
}
