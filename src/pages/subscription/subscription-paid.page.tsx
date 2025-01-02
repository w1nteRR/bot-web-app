import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import { useQuery } from 'react-query'

import { SubscriptionFeatures } from '../../components/subscription/subscription-features'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useBackButton } from '../../hooks/telegram/useBackButton'
import { Pages } from '../../types/navigation/navigation.types'

import success from '../../assets/lottie/success.json'
import { paymentsApi } from '../../api/payments.api'
import { useWebAppUserContext } from '../../hooks/context/useWebAppUserContext'
import { useSubscriptionExpirationDate } from '../../hooks/subscription/useSubscriptionExpirationDate'
import { SpinLoader } from '../../components/ui/loaders/spin-loader'
import { useTranslation } from 'react-i18next'

export const SubscriptionPaidPage: FC = () => {
  const { data, isLoading } = useQuery('', () =>
    paymentsApi.getSubscriptionExpirationDate({ user_id: user?.id! }),
  )

  const { themeParams } = useTelegram()
  const { user } = useWebAppUserContext()
  const { t } = useTranslation()

  const navigate = useNavigate()
  useBackButton(() => navigate(Pages.Home))

  const expirationDate = useSubscriptionExpirationDate(
    data?.data.subscription_expiration_date || 0,
  )

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
          {t('subscriptionPaid.title')}
        </p>
        <p
          className='text-center font-medium text-md'
          style={{ color: text_color }}
        >
          {t('subscriptionPaid.subtitle')}
          <br />
          {t('subscriptionPaid.subtitle-2')}
        </p>
        <div
          className='py-5 px-4 rounded-xl m-2 flex flex-col gap-5'
          style={{ backgroundColor: section_bg_color }}
        >
          <SubscriptionFeatures />
        </div>

        <div
          style={{ backgroundColor: section_bg_color }}
          className='py-5 px-4 m-1 rounded-xl flex flex-col gap-3.5'
        >
          <p
            style={{ color: text_color }}
            className='text-sm flex items-center'
          >
            {t('subscriptionPaid.subEnd')}
            {isLoading ? (
              <SpinLoader size={14} />
            ) : (
              <p className='font-bold ml-1'>{expirationDate}</p>
            )}
          </p>

          <p style={{ color: text_color }} className='text-sm'>
            {t('subscriptionPaid.contact')}{' '}
            <a href='/' style={{ color: link_color }}>
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
