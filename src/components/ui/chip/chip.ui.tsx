import { FC, ReactNode } from 'react'

import { useTelegram } from '../../../hooks/telegram/useTelegram'

interface IChipProps {
  isActive?: boolean
  children: ReactNode
  onClick?: () => void
}

export const Chip: FC<IChipProps> = ({ isActive, children, onClick }) => {
  const { themeParams } = useTelegram()

  return (
    <div
      onClick={onClick}
      className={
        'py-2 px-5 mr-5 transition ease-in-out rounded-full font-semibold text-sm'
      }
      style={{
        backgroundColor: isActive ? themeParams.secondary_bg_color : 'unset',
      }}
    >
      {children}
    </div>
  )
}
