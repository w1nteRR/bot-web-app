import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { useQuery } from 'react-query'
import type { PopupButton } from '@twa-dev/types'

import { RecentCard } from './recent.card'

import { useTelegram } from '../../hooks/telegram/useTelegram'

import { Pages } from '../../types/navigation/navigation.types'
import { IRecentUser } from '../../types/user/user.types'

import { ScrapperApi } from '../../api/scrapper.api'
import { db } from '../../db/recent-users.db'

const errorPopupButtons: PopupButton[] = [
  { id: '1', type: 'default', text: 'Go to profile' },
  { id: '2', type: 'destructive', text: 'Close' },
]

export const RecentListV3 = () => {
  const [user, setUser] = useState<IRecentUser>({} as IRecentUser)

  const { themeParams, showPopup, HapticFeedback } = useTelegram()
  const navigate = useNavigate()

  const queryKey = ['user stories', user.id]

  const query = useQuery(queryKey, () => ScrapperApi.getUserStories(user.id), {
    enabled: false,
    retry: 0,
    onSuccess: () => {
      navigate(`user/stories/${user.id}`, { state: { user } })
    },
    onError: () => {
      HapticFeedback.notificationOccurred('error')
      showPopup(
        {
          message: 'Stories not found.',
          buttons: errorPopupButtons,
        },
        (id) => {
          if (id === '1') {
            return navigate(
              `${Pages.User.replace(':username', user.username)}`,
              {
                state: { from: Pages.Home },
              }
            )
          }
        }
      )
    },
  })

  useEffect(() => {
    if (!user.id) return

    query.refetch()
  }, [user.id])

  const onUserClick = (user: IRecentUser) => {
    if (query.isLoading) return

    HapticFeedback.selectionChanged()

    setUser(user)
  }

  const recentUsers = useLiveQuery(() => db.recentUsers.toArray())

  if (!recentUsers?.length) return null

  return (
    <>
      <div className='mx-5 flex justify-between items-center'>
        <span
          className='uppercase text-sm'
          style={{ color: themeParams.hint_color }}
        >
          recent search
        </span>

        {query.isLoading && (
          <span className='text-xs' style={{ color: themeParams.hint_color }}>
            Loading...
          </span>
        )}
      </div>
      <div className='w-full mt-5 whitespace-nowrap overflow-scroll no-scrollbar'>
        {recentUsers?.map((user) => (
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
