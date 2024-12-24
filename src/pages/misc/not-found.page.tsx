import { FC } from 'react'
import Lottie from 'lottie-react'
import { useNavigate } from 'react-router-dom'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useBackButton } from '../../hooks/telegram/useBackButton'

import { Pages } from '../../types/navigation/navigation.types'
import notFound from '../../assets/lottie/not-found.json'

export const NotFoundPage: FC = () => {
  const { themeParams } = useTelegram()
  const navigate = useNavigate()

  useBackButton(() => navigate(Pages.Home))

  const { text_color } = themeParams

  return (
    <>
      <div className='h-screen flex flex-col justify-center items-center'>
        <div className='w-9/12 m-auto h-2/4'>
          <Lottie animationData={notFound} loop />

          <div>
            <p
              className='text-center font-medium text-md'
              style={{ color: text_color }}
            >
              User not found.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
