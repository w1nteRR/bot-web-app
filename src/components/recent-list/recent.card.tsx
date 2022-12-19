import { memo } from 'react'
import { useTelegram } from '../../hooks/telegram/useTelegram'

interface IRecentCardProps {
  profileImage: string
  username: string
  isActive: boolean
}

export const RecentCard = memo<IRecentCardProps>(
  ({ profileImage, username, isActive }) => {
    const { themeParams } = useTelegram()

    return (
      <>
        <img
          alt=''
          src={profileImage}
          className='h-14 w-14 rounded-full bg-zinc-300 m-auto cursor-pointer'
        />
        <p
          className='truncate w-14 text-xs font-medium mt-1'
          style={{ color: themeParams.text_color }}
        >
          {username}
        </p>

        {isActive && (
          <div
            className='h-1 w-3.5 rounded-full mt-3 m-auto'
            style={{
              backgroundColor: themeParams.link_color,
            }}
          />
        )}
      </>
    )
  }
)
