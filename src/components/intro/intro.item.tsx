import { FC } from 'react'
import { useTelegram } from '../../hooks/telegram/useTelegram'

export const IntroItem: FC = () => {
  const { themeParams } = useTelegram()

  return (
    <div className='flex flex-row my-5'>
      <div className='w-10 h-10 bg-gray-300'>img</div>
      <div className='mx-2'>
        <div>
          <span style={{ color: themeParams.text_color }}>Title</span>
        </div>
        <div>
          <span style={{ color: themeParams.hint_color }}>subtitle</span>
        </div>
      </div>
    </div>
  )
}
