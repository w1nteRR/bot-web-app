import { memo } from 'react'
import { useTelegram } from '../../../hooks/telegram/useTelegram'

interface IRecentManageItemProps {
  image: string
  title: string
  subtitle: string
  onRemoveClick: () => void
  onAddToChatClick: () => void
}

export const RecentManageItem = memo<IRecentManageItemProps>(
  ({ image, title, subtitle, onAddToChatClick, onRemoveClick }) => {
    const { themeParams } = useTelegram()

    return (
      <div className='flex w-full px-2 mb-5 '>
        <img className='bg-zinc-600 w-12 h-12 rounded-md' src={image} alt='' />
        <div className='mx-2 flex-1'>
          <p
            className='text-md font-semibold'
            style={{ color: themeParams.text_color }}
          >
            {title}
          </p>
          <p className='text-xs mt-1' style={{ color: themeParams.hint_color }}>
            {subtitle}
          </p>
        </div>
        <button
          className='mr-2'
          onClick={onAddToChatClick}
          style={{ color: themeParams.link_color }}
        >
          Test
        </button>
        <button
          style={{ color: themeParams.link_color }}
          onClick={onRemoveClick}
        >
          Remove
        </button>
      </div>
    )
  }
)
