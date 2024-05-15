import { useMemo, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import { CgSpinnerTwoAlt } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { RecentCard } from './recent.card'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useFavoritesContext } from '../../hooks/context/useFavoritesContext'

import { showRecentListPopupError } from '../../helpers/popup.error'
import { ScrapperApi } from '../../api/scrapper.api'
import { Pages } from '../../types/navigation/navigation.types'
import { IRecentUser } from '../../types/user/user.types'

export const RecentListV3 = () => {
  const [user, setUser] = useState<IRecentUser>({} as IRecentUser)

  const { t } = useTranslation()
  const { themeParams, HapticFeedback } = useTelegram()

  const navigate = useNavigate()

  const { favorites, isLoading: isFavoritesLoading } = useFavoritesContext()

  const query = useInfiniteQuery(
    ['user stories', user.id],
    ({ pageParam = 1 }) =>
      ScrapperApi.getUserStories({ id_user: user.id!, pageParam }),
    {
      retry: 1,
      enabled: !!user.id,
      onSuccess: (data) => {
        navigate(`${Pages.UserStories.replace(':id', user.id)}`, {
          state: { user, from: location.pathname },
        })
      },
      onError: () => {
        HapticFeedback.notificationOccurred('error')
        showRecentListPopupError(navigate, user.username)
      },
    },
  )

  const isLoading = query.isLoading || query.isRefetching

  const onUserClick = async (user: IRecentUser) => {
    if (isLoading) return

    setUser(user)
  }

  const reversedFavorites = useMemo(
    () => [...favorites].reverse(),
    [favorites.length],
  )

  if (isFavoritesLoading)
    return (
      <div className='w-full mt-5 flex justify-center gap-1 ransition ease-in-out delay-150'>
        <div className='inline-block px-1.5'>
          {[1, 2, 3, 4, 5].map((x) => (
            <div
              key={x}
              className='w-16 h-16 rounded-full animate-pulse inline-block  mt-1'
              style={{ backgroundColor: themeParams.secondary_bg_color }}
            />
          ))}
        </div>
      </div>
    )

  if (!favorites.length)
    return (
      <div
        className='rounded-xl p-3 m-5'
        style={{ backgroundColor: themeParams.section_bg_color }}
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
          style={{ color: themeParams.section_header_text_color }}
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
        {reversedFavorites.map((user) => (
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
