import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useBackButton } from '../../hooks/telegram/useBackButton'

import { Pages } from '../../types/navigation/navigation.types'

const lottieSrc = 'src/assets/lottie/not-found.lottie'
export const NotFoundPage: FC = () => {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>({} as DotLottie)
  const [isLoading, setIsLoading] = useState(true)

  const { themeParams } = useTelegram()
  const navigate = useNavigate()

  useBackButton(() => navigate(Pages.Home))

  const { text_color } = themeParams

  useEffect(() => {
    if (dotLottie) {
      setIsLoading(false)
    }
  }, [dotLottie])

  if (isLoading) return null

  return (
    <>
      <div className='h-screen flex flex-col justify-center items-center'>
        <div className='w-9/12 m-auto h-2/4'>
          <DotLottieReact
            src={lottieSrc}
            loop
            autoplay
            dotLottieRefCallback={setDotLottie}
          />

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
