import { FC, useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AxiosError } from 'axios'
import { useInfiniteQuery, useQuery } from 'react-query'
import { CgSpinnerTwoAlt } from 'react-icons/cg'
import { IoMdLock } from 'react-icons/io'

import { Title } from '../../components/ui/typography/title.ui'
import { Chip } from '../../components/ui/chip/chip.ui'
import { StoriesList } from '../../components/stories/stories.list'
import { AddToFavorites } from '../../components/favorites/add-favorites'

import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useRecentUsers } from '../../hooks/recent/useRecentUsers'

import { ScrapperApi } from '../../api/scrapper.api'
import { ILocationFrom } from '../../types/navigation/navigation.types'

export const UserPage: FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<null | number>(null)
  const [page, setPage] = useState<number>(1)

  const tg = useTelegram()

  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()

  const { from, isFromSearch } = location.state as ILocationFrom

  useBackButton(() => navigate(from, { state: { user: location.state.user } }))

  const { addUserToRecentCloudStorage } = useRecentUsers()

  const {
    data,
    isLoading,
    isError,
    isSuccess: isUserSuccess,
  } = useQuery(
    ['user', params.username],
    () => ScrapperApi.findUserByUsername(params.username!),
    {
      retry: 1,

      onError: (error) => {
        if (error instanceof AxiosError) {
          tg.HapticFeedback.notificationOccurred('error')
          tg.showAlert(error.response?.data.message, () => navigate(-1))
        }
      },
      onSuccess: async ({ data }) => {
        const { username, full_name, id, profile_image } = data

        if (isFromSearch) {
          addUserToRecentCloudStorage({
            username,
            full_name,
            id: String(id),
            profile_image,
          })
        }
      },
    },
  )

  const {
    data: storiesData,
    isLoading: isStoriesLoading,
    isError: isStoriesError,
    error: storiesError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchStories,
  } = useInfiniteQuery(
    ['user stories', data?.data.id],
    ({ pageParam = 1 }) =>
      ScrapperApi.getUserStories({ id_user: String(data?.data.id), pageParam }),
    {
      retry: 1,
      enabled: !!data?.data.id,
      staleTime: Infinity,
      getNextPageParam: (lastPage, allPages) => {
        console.log('last page')

        if (lastPage.data.stories.media.length === 10) {
          return lastPage.config.params.page + 1
        }

        return undefined
      },
    },
  )

  const mainButtonCallback = async () => {
    if (!hasNextPage) return

    setPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    if (page === 1) return

    const loadMore = async () => {
      await fetchNextPage()
    }

    loadMore().then()
  }, [page])

  useEffect(() => {
    if (!hasNextPage) {
      tg.MainButton.text
      tg.MainButton.hide
      tg.MainButton.offClick(mainButtonCallback)

      return
    }

    tg.MainButton.setText('Load more')
    tg.MainButton.show()
    tg.MainButton.onClick(mainButtonCallback)

    return () => {
      tg.MainButton.hide()
      tg.MainButton.text
      tg.MainButton.offClick(mainButtonCallback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state.user, hasNextPage])

  useEffect(() => {
    if (isFetchingNextPage) {
      tg.MainButton.showProgress()

      return
    }

    tg.MainButton.hideProgress()

    return () => {
      tg.MainButton.hideProgress()
    }
  }, [isFetchingNextPage])

  const onChipClick = (chipIndex: number) => {
    setActiveTabIndex(chipIndex)

    if (chipIndex === 0) return refetchStories()
  }

  const writeError = useMemo(() => {
    const error = storiesError as AxiosError<{ message: string }>

    if (!error) return null

    return error.response?.data.message || ''
  }, [storiesError])

  if (isLoading)
    return (
      <div className='h-screen flex items-center justify-center'>
        <CgSpinnerTwoAlt
          className='animate-spin ml-2'
          color={tg.themeParams.link_color}
          size={26}
        />
      </div>
    )

  if (isError) return <></>

  if (!data) return <p>{t('common.noDataAvailable')}</p>

  const storiesFlatted =
    storiesData?.pages?.flatMap((response) => response.data.stories.media) || []

  const { username, profile_image, full_name, id, is_privite } = data.data

  return (
    <div className='py-10'>
      <div className='flex px-5 justify-between'>
        <div className='truncate'>
          <Title>{data.data.username}</Title>
          <p className='text-sm' style={{ color: tg.themeParams.hint_color }}>
            {data?.data.full_name}
          </p>
        </div>

        <img
          className='bg-gray-500 w-20 h-20 rounded-full'
          alt='avatar'
          src={data?.data.profile_image}
        />
      </div>

      <div className='my-5 mx-5 bg'>
        <pre
          className='text-xs whitespace-pre-wrap'
          style={{ color: tg.themeParams.text_color }}
        >
          {data?.data.biography}
        </pre>
      </div>
      <ul
        className='flex  mx-5 gap-x-1'
        style={{ color: tg.themeParams.hint_color, fontSize: 12 }}
      >
        <li>
          &#x2022;{' '}
          <span className='font-semibold'>{data?.data.followers.count}</span>{' '}
          {t('user.followers')}
        </li>
        <li>
          &#x2022;{' '}
          <span className='font-semibold'>{data?.data.following.count}</span>{' '}
          {t('user.following')}
        </li>
        {data?.data.category_name && (
          <li>&#x2022; {data.data.category_name}</li>
        )}
      </ul>

      {!is_privite && (
        <div className='mt-5 px-2'>
          <AddToFavorites
            user={{ username, profile_image, full_name, id: String(id) }}
          />
        </div>
      )}

      {is_privite ? (
        <div className='flex items-center justify-center mt-10'>
          <Chip isActive>
            <div className='flex items-center'>
              <span style={{ color: tg.themeParams.text_color }}>
                {t('user.userIsPrivate')}
              </span>
              <IoMdLock
                size={16}
                color={tg.themeParams.link_color}
                className='ml-2'
              />
            </div>
          </Chip>
        </div>
      ) : (
        <>
          <div className='flex items-center justify-center mt-10'>
            {[t('common.stories')].map((tab, index) => (
              <Chip
                key={index}
                isActive={activeTabIndex === index}
                onClick={() => onChipClick(index)}
              >
                <div className='flex items-center'>
                  {isStoriesError ? (
                    <div className='text-center'>
                      <span style={{ color: tg.themeParams.text_color }}>
                        {writeError}
                      </span>
                      <br />
                      <span
                        style={{ color: tg.themeParams.hint_color }}
                        className='text-xs'
                      >
                        {t('user.tapToRefetch')}
                      </span>
                    </div>
                  ) : (
                    <span style={{ color: tg.themeParams.text_color }}>
                      {tab}
                    </span>
                  )}

                  {isStoriesLoading && (
                    <CgSpinnerTwoAlt
                      className='animate-spin ml-2'
                      color={tg.themeParams.link_color}
                      size={13}
                    />
                  )}
                </div>
              </Chip>
            ))}
          </div>
          <div className='my-5'>
            <StoriesList stories={storiesFlatted} />
          </div>
        </>
      )}
    </div>
  )
}
