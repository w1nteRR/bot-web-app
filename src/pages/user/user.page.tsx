import { FC, useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
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

export const UserPage: FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<null | number>(null)

  const tg = useTelegram()

  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = useParams()
  // const location = useLocation()

  useBackButton(() =>
    // navigate(location.state.from, { state: { user: location.state.user } })
    navigate(-1),
  )

  const { addUserToRecentCloudStorage } = useRecentUsers()

  const { data, isLoading, isError } = useQuery(
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

        await addUserToRecentCloudStorage({
          username,
          full_name,
          id: String(id),
          profile_image,
        })
      },
    },
  )

  const {
    data: stories,
    isLoading: isStoriesLoading,
    isError: isStoreisError,
    error: storiesError,
    refetch: refetchStories,
  } = useQuery(
    ['user stories', data?.data.id],
    () => ScrapperApi.getUserStories(String(data?.data.id)),
    {
      enabled: false,
      retry: 0,
      onError: () => {
        tg.HapticFeedback.notificationOccurred('error')
      },
    },
  )

  const onChipClick = (chipIndex: number) => {
    setActiveTabIndex(chipIndex)

    if (chipIndex === 0) return refetchStories()
  }

  const writeError = useMemo(() => {
    const error = storiesError as AxiosError<{ message: string }>

    if (!error) return null

    return error.response?.data.message || ''
  }, [storiesError])

  useEffect(() => {
    tg.MainButton.hide()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const { username, profile_image, full_name, id, is_privite } = data.data

  return (
    <div className='py-10'>
      <div className='flex px-5 justify-between'>
        <div>
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

      {/*<div className='w-56 m-auto'>*/}
      {/*  <div className='my-5 text-center'>*/}
      {/*    <Title>{data?.data.username}</Title>*/}

      {/*  </div>*/}
      {/*</div>*/}

      {/*<div className='flex items-center justify-center py-3'>*/}

      {/*</div>*/}

      <div className='my-5 mx-5'>
        <pre className='text-xs' style={{ color: tg.themeParams.text_color }}>
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
      <div className='mt-5'>
        <AddToFavorites
          user={{ username, profile_image, full_name, id: String(id) }}
        />
      </div>

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
                  {isStoreisError ? (
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
            <StoriesList stories={stories?.data.stories.media || []} />
          </div>
        </>
      )}
    </div>
  )
}
