import { FC, ReactNode } from 'react'
import { useTelegram } from '../../../hooks/telegram/useTelegram'

interface ITitleProps {
  children: ReactNode
  size?: string
}

export const Title: FC<ITitleProps> = ({ children, size = '4xl' }) => {
  const { themeParams } = useTelegram()

  return (
    <p
      className={`text-3xl font-bold truncate`}
      style={{ color: themeParams.text_color }}
    >
      {children}
    </p>
  )
}
