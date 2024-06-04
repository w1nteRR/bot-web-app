import { memo } from 'react'
import { useTelegram } from '../../hooks/telegram/useTelegram'

interface IRecentCardProps {
  image: string
  username: string
  onClick: () => void
}

export const RecentCard = memo<IRecentCardProps>(
  ({ image, username, onClick }) => {
    const { themeParams } = useTelegram()

    return (
      <div className='inline-block px-1.5' onClick={onClick}>
        <img className='w-16 h-16 rounded-full' src={image} alt={'icon'} />
        <p
          className='truncate w-16 text-xs font-medium mt-1'
          style={{ color: themeParams.text_color }}
        >
          {username}
        </p>
      </div>
    )
  },
)
