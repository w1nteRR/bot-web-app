import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserCard } from '../../components/shared/cards/user-card'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useFavorites } from '../../hooks/favorites/useFavorites'

export const NotificationsPage: FC = () => {
  const navigate = useNavigate()

  const { themeParams, MainButton } = useTelegram()
  const { list } = useFavorites()

  useBackButton(() => navigate(-1))


  useEffect(() => {
    MainButton.show()
  }, [])

  return (<div>
      <div className="p-5 flex flex-col gap-3.5">
        <p className="text-4xl font-bold text-center" style={{ color: themeParams.text_color }}>Choose accounts from
          Your Favorites</p>
        <p className="text-center font-medium text-md" style={{ color: themeParams.text_color }}>Customize your
          notification experience with adjustable frequency
          settings</p>
        <p className="text-center text-sm mt-3" style={{ color: themeParams.hint_color }}>
          Maximize ability to create up to five notifications*
        </p>
      </div>

      <div className="mx-3  rounded-xl" style={{ backgroundColor: themeParams.secondary_bg_color }}>
        {list.slice(0, 4).map(user => (<div key={user.id} className="p-3 flex justify-between">
            <UserCard  {...user} />

            <div className="flex items-center">
              <input type="checkbox" className="p-1" />
            </div>
          </div>))}
      </div>

      <div className="flex justify-center mt-4">
        <button><span className="font-bold" style={{ color: themeParams.link_color }}>Show More</span></button>
      </div>
    </div>)
}