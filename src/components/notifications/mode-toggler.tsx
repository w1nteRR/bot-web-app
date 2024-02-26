import { FC, useState } from 'react'
import {
  IoNotificationsOffCircleSharp,
  IoNotificationsCircle,
} from 'react-icons/io5'
import { useTelegram } from '../../hooks/telegram/useTelegram'

export const ModeToggler: FC = () => {
  const [checked, setIsChecked] = useState(false)

  const { themeParams } = useTelegram()

  return (
    <div className='flex justify-between'>
      <div className='flex items-center gap-2'>
        {checked ? (
          <>
            <div>
              <IoNotificationsCircle className='text-green-500' size={28} />
            </div>
            <p style={{ color: themeParams.text_color }}>Allow notifications</p>
          </>
        ) : (
          <>
            <div>
              <IoNotificationsOffCircleSharp
                color={themeParams.hint_color}
                size={28}
              />
            </div>
            <p style={{ color: themeParams.text_color }}>Silent mode</p>
          </>
        )}
      </div>

      <label className='inline-flex items-center cursor-pointer'>
        <input
          type='checkbox'
          value=''
          className='sr-only peer'
          checked={checked}
          onChange={() => setIsChecked(!checked)}
        />
        <div className="relative peer-checked:bg-tg-accent w-11 h-6 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 "></div>
      </label>
    </div>
  )
}
