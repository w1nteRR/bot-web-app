import { FC } from 'react'
import { useTelegram } from '../../hooks/telegram/useTelegram'

export const Footer: FC = () => {
  const { themeParams } = useTelegram()

  const { hint_color } = themeParams

  return (
    <footer className='mx-5 pt-20 pb-10 relative bottom-0'>
      <p className='text-xs text-center' style={{ color: hint_color }}>
        Stories Viewer Bot is not affiliated with Instagram. We do not store or
        host any content on our servers. All rights to the content belong to
        their respective owners
      </p>
      <p className='text-xs text-center pt-2' style={{ color: hint_color }}>
        © 2024 Stories Viewer Bot. All rights reserved.
      </p>
    </footer>
  )
}
