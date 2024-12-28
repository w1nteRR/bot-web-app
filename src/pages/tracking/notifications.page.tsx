import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'

import { UserCard } from '../../components/shared/cards/user-card'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useNotifications } from '../../hooks/notifications/useNotifications'
import { useFavoritesContext } from '../../hooks/context/useFavoritesContext'

import { Pages } from '../../types/navigation/navigation.types'
import { useWebAppUserContext } from '../../hooks/context/useWebAppUserContext'

import noFavorites from '../../assets/lottie/no-favorites.json'
import success from '../../assets/lottie/success-2.json'

const TRIM_OFFSET = 5

export const NotificationsPage: FC = () => {
  const [trimOffset, setTrimOffset] = useState(TRIM_OFFSET)
  const [selected, setSelected] = useState<Array<string>>([])

  const navigate = useNavigate()

  const { themeParams, MainButton, onEvent, offEvent } = useTelegram()
  const { create, isLoading } = useNotifications()

  const { favorites } = useFavoritesContext()
  const { user } = useWebAppUserContext()

  const ACCOUNTS_LIMIT = user?.is_subscriber ? 4 : 1

  useBackButton(() => navigate(Pages.Home))

  const handleShowMoreClick = () => {
    setTrimOffset(favorites.length)
  }

  const createNotifications = async () => {
    if (!selected.length) return

    await create(selected)
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const userId = event.target.value

    const isSelected = selected.includes(userId)

    if (isSelected) {
      setSelected((prevSelected) => prevSelected.filter((id) => id !== userId))
    } else {
      setSelected((prevSelected) => [...prevSelected, userId])
    }
  }

  const handleSubscribeButton = () => navigate(Pages.Subscription)

  useEffect(() => {
    if (!favorites.length) {
      MainButton.hide()

      return
    }

    MainButton.setParams({
      text: 'Continue',
      text_color: themeParams.button_text_color,
      color: themeParams.button_color,
    })

    MainButton.enable()
    MainButton.show()

    if (selected.length > ACCOUNTS_LIMIT) {
      MainButton.disable()
      MainButton.setParams({
        color: themeParams.bg_color,
        text_color: themeParams.hint_color,
        text: 'Limit is exceeded',
      })

      return
    }
  }, [selected.length])

  useEffect(() => {
    if (isLoading) {
      MainButton.showProgress()

      return
    }

    MainButton.hideProgress()
  }, [isLoading])

  useEffect(() => {
    onEvent('mainButtonClicked', createNotifications)

    return () => {
      offEvent('mainButtonClicked', createNotifications)
    }
  }, [create, selected.length])

  return (
    <div>
      <div className='p-5 flex flex-col gap-3.5'>
        <p
          className='text-4xl font-bold text-center'
          style={{ color: themeParams.text_color }}
        >
          Setup tracking accounts
        </p>

        <div
          className='py-3 mt-5 px-5 flex justify-center items-center rounded-xl'
          style={{ backgroundColor: themeParams.section_bg_color }}
        >
          <div className='flex justify-between items-center w-full'>
            <div>
              <p
                className='font-semibold'
                style={{ color: themeParams.text_color }}
              >
                Accounts Limit
              </p>
              <p
                className='text-sm'
                style={{
                  color: themeParams.subtitle_text_color,
                  cursor: 'pointer',
                }}
              >
                Up to <b>{user?.is_subscriber ? 'four' : 'one'}</b>{' '}
                notifications
              </p>
            </div>

            <div>
              {user?.is_subscriber ? (
                <Lottie
                  animationData={success}
                  className='h-11 w-11'
                  loop={false}
                />
              ) : (
                <button
                  onClick={handleSubscribeButton}
                  className='font-bold'
                  style={{ color: themeParams.link_color }}
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>
        </div>

        {!user?.is_subscriber && (
          <p
            className='text-sm text-center font-bold'
            style={{ color: themeParams.subtitle_text_color }}
          >
            Subscribe to increase your notifications limit
          </p>
        )}
      </div>

      <div
        className='mx-3 rounded-xl'
        style={{ backgroundColor: themeParams.section_bg_color }}
      >
        {favorites.slice(0, trimOffset).map((user) => (
          <div key={user.id} className='p-3 flex justify-between'>
            <UserCard {...user} />

            <div className='flex items-center'>
              <input
                type='checkbox'
                className='p-2.5'
                value={user.id}
                onChange={handleCheckboxChange}
              />
            </div>
          </div>
        ))}
      </div>

      {favorites.length ? (
        <div className='flex justify-center my-4'>
          {favorites.length > TRIM_OFFSET && trimOffset === TRIM_OFFSET ? (
            <button onClick={handleShowMoreClick}>
              <span
                className='font-bold'
                style={{ color: themeParams.link_color }}
              >
                Show More
              </span>
            </button>
          ) : (
            <div />
          )}
        </div>
      ) : (
        <div className='flex flex-col'>
          <Lottie className='h-80' animationData={noFavorites} />

          <div className='p-3 mx-5 flex flex-col tems-center'>
            <p
              className='font-medium'
              style={{ color: themeParams.text_color }}
            >
              No Favorites Accounts
            </p>
            <p className='text-sm' style={{ color: themeParams.hint_color }}>
              You need favorites accounts to start tracking
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
