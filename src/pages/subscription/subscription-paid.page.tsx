import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'

import { SubscriptionFeatures } from '../../components/subscription/subscription-features'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useBackButton } from '../../hooks/telegram/useBackButton'
import { Pages } from '../../types/navigation/navigation.types'

import success from '../../assets/lottie/success.json'

export const SubscriptionPaidPage: FC = () => {
  const { themeParams } = useTelegram()

  const navigate = useNavigate()
  useBackButton(() => navigate(Pages.Home))

  const { text_color, section_bg_color, link_color, subtitle_text_color } =
    themeParams

  return (
    <div className='px-3 py-5'>
      <div className='w-40 h-40 m-auto'>
        <Lottie animationData={success} />
      </div>
      <div className='flex flex-col gap-3.5 my-5'>
        <p
          className='text-center font-medium text-3xl'
          style={{ color: text_color }}
        >
          Subscription Successful!
        </p>
        <p
          className='text-center font-medium text-md'
          style={{ color: text_color }}
        >
          Thank you for subscribing!
          <br />
          We’re excited to have you on board.
        </p>
        <div
          className='py-5 px-4 rounded-xl m-2 flex flex-col gap-5'
          style={{ backgroundColor: section_bg_color }}
        >
          <SubscriptionFeatures />
        </div>

        <div
          style={{ backgroundColor: section_bg_color }}
          className='py-5 px-4 m-2 rounded-xl flex flex-col gap-3.5'
        >
          <p style={{ color: text_color }} className='text-sm'>
            Your subscription ends on <b>22.07.2024</b>
          </p>

          <p style={{ color: text_color }} className='text-sm'>
            Need help? Contact us at{' '}
            <span style={{ color: link_color }}>support@example.com</span> or
            visit our <span style={{ color: link_color }}>Help Center</span>.
          </p>
        </div>
      </div>
    </div>
  )
}