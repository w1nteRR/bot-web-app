import { FC } from 'react'
import { CgSpinnerTwoAlt } from 'react-icons/cg'

import { useTelegram } from '../../../hooks/telegram/useTelegram'

interface ISpinLoaderProps {
  fullscreen?: boolean
  size?: number
}
export const SpinLoader: FC<ISpinLoaderProps> = ({ fullscreen, size = 26 }) => {
  const { themeParams } = useTelegram()

  if (fullscreen)
    return (
      <div
        className='h-screen flex items-center justify-center'
        style={{ backgroundColor: themeParams.secondary_bg_color }}
      >
        <CgSpinnerTwoAlt
          className='animate-spin ml-2'
          color={themeParams.link_color}
          size={size}
        />
      </div>
    )

  return (
    <CgSpinnerTwoAlt
      className='animate-spin ml-2'
      color={themeParams.link_color}
      size={size}
    />
  )
}
