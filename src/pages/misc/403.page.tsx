import { FC } from 'react'
import Lottie from 'lottie-react'

import invalidUser from '../../assets/lottie/invalid-user.json'
import { useTelegram } from '../../hooks/telegram/useTelegram'

export const NotAuthorizedPage: FC = () => {
  const { themeParams } = useTelegram()

  const { text_color } = themeParams

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <div className='w-9/12 m-auto'>
        <Lottie animationData={invalidUser} loop />

        <div>
          <p
            className='text-center font-medium text-md'
            style={{ color: text_color }}
          >
            We cannot verify Your identity.
          </p>
        </div>
      </div>
    </div>
  )
}
