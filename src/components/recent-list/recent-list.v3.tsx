import { useEffect } from 'react'
import { CgSpinnerTwoAlt } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { RecentCard } from './recent.card'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useStoriesQuery } from '../../hooks/stories/useStoriesQuery'

import { IRecentUser } from '../../types/user/user.types'
import { db } from '../../db/recent-users.db'
import { showRecentListPopupError } from '../../helpers/popup.error'
import { useFavorites } from '../../hooks/favorites/useFavorites'

export const RecentListV3 = () => {
  const { t } = useTranslation()
  const { themeParams, HapticFeedback } = useTelegram()

  const { setUser, query, user } = useStoriesQuery()
  const navigate = useNavigate()

  const { list, isLoading: isFavoritesLoading } = useFavorites()

  const onUserClick = (user: IRecentUser) => {
    if (query.isLoading) return

    HapticFeedback.selectionChanged()

    setUser(user)
  }

  useEffect(() => {
    if (user.id) {
      query.refetch().then((result) => {
        if (result.isError) {
          showRecentListPopupError(navigate, user.username)
        }
      })
    }
  }, [user.id])

  const isLoading = query.isLoading || query.isRefetching

  console.log('is loading', isFavoritesLoading)
  console.log('fav', list)

  if (isFavoritesLoading)
    return (
      <div className='w-full mt-5 flex justify-center gap-1'>
        {[1, 2, 3, 4, 5].map((x) => (
          <div
            key={x}
            className='w-16 h-16 rounded-full animate-pulse inline-block'
            style={{ backgroundColor: themeParams.secondary_bg_color }}
          />
        ))}
      </div>
    )

  if (!list.length)
    return (
      <div
        className='rounded-xl p-3 m-5'
        style={{ backgroundColor: themeParams.secondary_bg_color }}
      >
        <p
          style={{ color: themeParams.text_color }}
          className='text-center font-semibold'
        >
          {t('favorites.emptyTitle')}
        </p>

        <p
          style={{ color: themeParams.hint_color }}
          className='text-center text-xs'
        >
          {t('favorites.emptyBody')}
        </p>
      </div>
    )

  return (
    <>
      <div className='mx-5 flex justify-between items-center'>
        <span
          className='uppercase text-sm'
          style={{ color: themeParams.hint_color }}
        >
          {t('home.favorites')}
        </span>

        {isLoading && (
          <CgSpinnerTwoAlt
            className='animate-spin'
            color={themeParams.link_color}
            size={16}
          />
        )}
      </div>

      <div className='w-full mt-5 whitespace-nowrap overflow-x-scroll'>
        {list.map((user) => (
          <RecentCard
            key={user.id}
            username={user.username}
            image={user.profile_image}
            onClick={() => onUserClick(user)}
          />
        ))}
      </div>
    </>
  )
}
