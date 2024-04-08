import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserCard } from '../../components/shared/cards/user-card'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useNotifications } from '../../hooks/notifications/useNotifications'
import { useFavoritesContext } from '../../hooks/context/useFavoritesContext'

import { Pages } from '../../types/navigation/navigation.types'

const TRIM_OFFSET = 5
export const NotificationsPage: FC = () => {
  const [trimOffset, setTrimOffset] = useState(TRIM_OFFSET)
  const [selected, setSelected] = useState<Array<string>>([])

  const navigate = useNavigate()

  const { themeParams, MainButton, onEvent, offEvent, initDataUnsafe } =
    useTelegram()
  const { create, isLoading } = useNotifications()

  const { favorites } = useFavoritesContext()

  useBackButton(() => navigate(Pages.Home))

  const handleShowMoreClick = () => {
    setTrimOffset(favorites.length)
  }

  const createNotifications = async () => {
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

  useEffect(() => {
    MainButton.setParams({
      text: 'Continue',
      text_color: themeParams.button_text_color,
      color: themeParams.button_color,
    })

    MainButton.enable()
    MainButton.show()

    if (!selected.length) {
      MainButton.disable()
    }

    if (selected.length > 5) {
      MainButton.disable()
      MainButton.setParams({
        color: themeParams.bg_color,
        text_color: themeParams.hint_color,
        text: 'Limit is exceeded',
      })

      return
    }

    return () => {
      MainButton.enable()
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
          Choose accounts from Your Favorites
        </p>
        <p
          className='text-center font-medium text-md'
          style={{ color: themeParams.text_color }}
        >
          Customize your notification experience with adjustable frequency
          settings
        </p>
        <p
          className='text-center text-sm mt-3'
          style={{ color: themeParams.hint_color }}
        >
          Maximize ability to create up to five notifications*
        </p>
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
                className='p-1'
                value={user.id}
                onChange={handleCheckboxChange}
              />
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center mt-4'>
        {trimOffset === TRIM_OFFSET ? (
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
    </div>
  )
}
