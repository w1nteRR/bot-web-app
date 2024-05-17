const modeTitle = import.meta.env.VITE_MODE_TITLE as string

import { useTelegram } from '../../hooks/telegram/useTelegram'
import packageJson from '../../../package.json'

export const ProjectMode = () => {
  const { themeParams } = useTelegram()

  if (modeTitle === 'Production') return null

  return (
    <div
      style={{ backgroundColor: themeParams.section_bg_color }}
      className='p-1 px-5 w-fit rounded-xl m-auto'
    >
      <p
        className='text-xs'
        style={{ color: themeParams.section_header_text_color }}
      >
        <b>{modeTitle === 'Development' && 'dev:'}</b>
        <b>{modeTitle === 'Staging' && 'staging:'}</b>
        {packageJson.version}
      </p>
    </div>
  )
}
