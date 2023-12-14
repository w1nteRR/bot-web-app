import { useEffect } from 'react'
import { CgSpinnerTwoAlt } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'

import { RecentCard } from './recent.card'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useStoriesQuery } from '../../hooks/stories/useStoriesQuery'

import { IRecentUser } from '../../types/user/user.types'
import { db } from '../../db/recent-users.db'
import { showRecentListPopupError } from '../../helpers/popup.error'
import { useFavorites } from '../../hooks/favorites/useFavorites'

export const RecentListV3 = () => {
  const { themeParams, HapticFeedback } = useTelegram()

  const { setUser, query, user } = useStoriesQuery()
  const navigate = useNavigate()

  const { list } = useFavorites()

  const onUserClick = (user: IRecentUser) => {
    if (query.isLoading) return

    HapticFeedback.selectionChanged()

    setUser(user)
  }

  // const recentUsers = useLiveQuery(() => db.recentUsers.toArray())

  useEffect(() => {
    if (user.id) {
      query.refetch().then((result) => {
        if (result.isError) {
          showRecentListPopupError(navigate, user.username)
        }
      })
    }
  }, [user.id])

  // if (!recentUsers?.length) return null

  return (
    <>
      <div className='mx-5 flex justify-between items-center'>
        <span
          className='uppercase text-sm'
          style={{ color: themeParams.hint_color }}
        >
          Favorites
        </span>

        {query.isLoading && (
          <CgSpinnerTwoAlt
            className='animate-spin'
            color={themeParams.link_color}
            size={16}
          />
        )}
      </div>
      <div className='w-full mt-5 whitespace-nowrap overflow-scroll no-scrollbar'>
        {list?.map((user) => (
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
