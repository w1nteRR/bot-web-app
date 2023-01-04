import { FC, useMemo, ReactNode } from 'react'

import { useTelegram } from '../../../hooks/telegram/useTelegram'

export const Alert: FC<{ children: ReactNode }> = ({ children }) => {
  const { themeParams, colorScheme } = useTelegram()

  const bgColor = useMemo(
    () =>
      colorScheme === 'dark'
        ? themeParams.bg_color
        : themeParams.secondary_bg_color,
    [colorScheme]
  )

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className='p-4 mx-3 my-5 rounded-xl flex justify-between items-center'
    >
      {children}
    </div>
  )
}
