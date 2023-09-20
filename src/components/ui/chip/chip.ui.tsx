import { FC, ReactNode, useMemo } from 'react'
import { useTelegram } from '../../../hooks/telegram/useTelegram'

interface IChipProps {
  isActive: boolean
  children: ReactNode
  onClick?: () => void
}

export const Chip: FC<IChipProps> = ({ isActive, children, onClick }) => {
  const { themeParams, colorScheme } = useTelegram()

  const backgroundColor = useMemo(() => {
    if (isActive && colorScheme === 'dark') return themeParams.bg_color
    if (isActive && colorScheme === 'light') return themeParams.bg_color

    return 'unset'

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, colorScheme])

  return (
    <div
      onClick={onClick}
      className='py-2 px-5 mr-5 rounded-full font-semibold text-sm'
      style={{
        backgroundColor,
      }}
    >
      {children}
    </div>
  )
}
