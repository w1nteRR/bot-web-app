import { useEffect } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { useNavigate } from 'react-router-dom'

import { RecentCard } from './recent.card'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useStoriesQuery } from '../../hooks/stories/useStoriesQuery'

import { IRecentUser } from '../../types/user/user.types'
import { db } from '../../db/recent-users.db'
import { showRecentListPopupError } from '../../helpers/popup.error'

export const RecentListV3 = () => {
  const { themeParams, HapticFeedback } = useTelegram()

  const { setUser, query, user } = useStoriesQuery()
  const navigate = useNavigate()

  const onUserClick = (user: IRecentUser) => {
    if (query.isLoading) return

    HapticFeedback.selectionChanged()

    setUser(user)
  }

  const recentUsers = useLiveQuery(() => db.recentUsers.toArray())

  useEffect(() => {
    if (user.id) {
      query.refetch().then((result) => {
        if (result.isError) {
          showRecentListPopupError(navigate, user.username)
        }
      })
    }
  }, [user.id])

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
