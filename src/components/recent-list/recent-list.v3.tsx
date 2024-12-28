import { useEffect, useMemo, useState } from 'react'
import { useInfiniteQuery, useQueryClient } from 'react-query'
import { CgSpinnerTwoAlt } from 'react-icons/cg'
import { IoMdSettings } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { RecentCard } from './recent.card'
import { ModalVerticalV2 } from '../ui/modals/modal-vertical-v2'
import { FavoritesModalContent } from '../favorites/favorites-modal.content'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useFavoritesContext } from '../../hooks/context/useFavoritesContext'
import { useModal } from '../../hooks/common/useModal'

import { ScrapperApi } from '../../api/scrapper.api'

import { showRecentListPopupError } from '../../helpers/popup.error'
import { Pages } from '../../types/navigation/navigation.types'
import { IRecentUser } from '../../types/user/user.types'
import { useWebAppUserContext } from '../../hooks/context/useWebAppUserContext'
import { FavoritesLimits } from '../../types/subscription/subscription.types'

export const RecentListV3 = () => {
  const [user, setUser] = useState<IRecentUser>({} as IRecentUser)

  const { t } = useTranslation()
  const { themeParams, HapticFeedback } = useTelegram()
  const { open, handleModalOpen, handleModalClose } = useModal()
  const { favorites, isLoading: isFavoritesLoading } = useFavoritesContext()
  const { user: webUser } = useWebAppUserContext()

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const query = useInfiniteQuery(
    ['user stories', user.id],
    ({ pageParam = 1 }) =>
      ScrapperApi.getUserStories({ id_user: user.id!, pageParam }),
    {
      retry: 1,
      enabled: !!user.id,
      staleTime: Infinity,

      onSuccess: () => {
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

    const cachedData = queryClient.getQueryData<{ pages: []; pageParams: [] }>([
      'user stories',
      user.id,
    ])

    if (!cachedData?.pages.length) {
      setUser(user)

      return
    }

    navigate(`${Pages.UserStories.replace(':id', user.id)}`, {
      state: { user, from: location.pathname },
    })
  }

  const reversedFavorites = useMemo(
    () => [...favorites].reverse(),
    [favorites.length],
  )

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

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
        className='rounded-xl p-3 m-3'
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
        {isLoading ? (
          <CgSpinnerTwoAlt
            className='animate-spin'
            color={themeParams.link_color}
            size={16}
          />
        ) : (
          <button>
            <IoMdSettings
              color={themeParams.link_color}
              size={20}
              onClick={handleModalOpen}
            />
          </button>
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

      <ModalVerticalV2
        open={open}
        onClose={handleModalClose}
        header={
          <div
            className='px-4 py-1 flex items-center gap-1 rounded-xl'
            style={{ backgroundColor: themeParams.section_bg_color }}
          >
            <p style={{ color: themeParams.hint_color }} className='text-xs'>
              {favorites.length}
            </p>

            <p
              className='text-xs font-bold'
              style={{ color: themeParams.text_color }}
            >
              /
            </p>

            <p style={{ color: themeParams.text_color }} className='text-xs'>
              {webUser?.is_subscriber
                ? FavoritesLimits.Unlimited
                : FavoritesLimits.Limited}
            </p>
          </div>
        }
      >
        <FavoritesModalContent />
      </ModalVerticalV2>
    </>
  )
}
