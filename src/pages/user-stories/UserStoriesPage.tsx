import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useInfiniteQuery } from 'react-query'
import { AxiosError } from 'axios'
import { MdChevronRight } from 'react-icons/md'

import { StoriesList } from '../../components/stories/stories.list'

import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useTelegram } from '../../hooks/telegram/useTelegram'

import { ScrapperApi } from '../../api/scrapper.api'
import { Pages } from '../../types/navigation/navigation.types'

export const UserStoriesPage = () => {
  const [page, setPage] = useState<number>(1)
  const [storiesTotal, setStoriesTotal] = useState<number>(0)

  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()
  const { t } = useTranslation()

  const { themeParams, MainButton } = useTelegram()

  useBackButton(() => navigate(location.state.from || '/'))

  const {
    data: storiesData,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['user stories', params.id],
    ({ pageParam = 1 }) =>
      ScrapperApi.getUserStories({ id_user: params.id!, pageParam }),
    {
      retry: 1,
      enabled: false,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.data.stories.media.length === 10) {
          return true
        }

        return undefined
      },
    },
  )

  const onProfileButtonClick = () =>
    navigate(
      `${Pages.User.replace(':username', location.state.user.username)}`,
      {
        state: { from: location.pathname },
      },
    )

  useEffect(() => {
    const mainButtonCallback = async () => {
      if (!hasNextPage) return

      setPage((prevPage) => prevPage + 1)
      await fetchNextPage({ pageParam: page + 1 })
    }

    if (!hasNextPage) {
      MainButton.text
      MainButton.hide
      MainButton.offClick(mainButtonCallback)

      return
    }

    MainButton.setText('Load more')
    MainButton.show()
    MainButton.onClick(mainButtonCallback)

    return () => {
      MainButton.hide()
      MainButton.text
      MainButton.offClick(mainButtonCallback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MainButton, location.state.user, hasNextPage])

  useEffect(() => {
    if (isFetchingNextPage) {
      MainButton.showProgress()

      return
    }

    MainButton.hideProgress()

    return () => {
      MainButton.hideProgress()
    }
  }, [isFetchingNextPage])

  if (isLoading)
    return (
      <p style={{ color: themeParams.text_color }}>
        {t('common.loadingStories')}
      </p>
    )

  if (isError)
    return (
      <p style={{ color: themeParams.text_color }}>
        {error instanceof AxiosError && error.response?.data.message}
      </p>
    )

  const storiesFlatted =
    storiesData?.pages?.flatMap((response) => response.data.stories.media) || []

  return (
    <div>
      <div className='m-5'>
        <div
          className='rounded-xl p-2 px-4 flex items-center justify-between'
          style={{ backgroundColor: themeParams.section_bg_color }}
        >
          <p
            style={{ color: themeParams.section_header_text_color }}
            className='text-sm'
          >
            Found <b>{storiesTotal}</b> stories
          </p>

          <button
            style={{ color: themeParams.link_color }}
            className='flex items-center'
            onClick={onProfileButtonClick}
          >
            Profile
            <MdChevronRight size={25} />
          </button>
        </div>
      </div>
      <StoriesList stories={storiesFlatted} />
    </div>
  )
}
