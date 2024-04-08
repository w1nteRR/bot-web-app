import { FC } from 'react'
import { CgSpinnerTwoAlt } from 'react-icons/cg'

import { useTelegram } from '../../../hooks/telegram/useTelegram'

interface ISpinLoaderProps {
  fullscreen?: boolean
}
export const SpinLoader: FC<ISpinLoaderProps> = ({ fullscreen }) => {
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
          size={26}
        />
      </div>
    )

  return (
    <CgSpinnerTwoAlt
      className='animate-spin ml-2'
      color={themeParams.link_color}
      size={26}
    />
  )
}
