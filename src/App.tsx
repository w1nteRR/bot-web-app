import React, { useEffect } from 'react'

import { useRoutes } from './hooks/useRoutes'
import { useTelegram } from './hooks/telegram/useTelegram'

function App() {
  const tg = useTelegram()
  const routes = useRoutes()

  useEffect(() => {
    tg.ready()
    tg.expand()

    console.log('color')

    console.log('theme', tg.themeParams)

    tg.setBackgroundColor(tg.themeParams.secondary_bg_color)

    // console.log('tg', tg.backgroundColor)
  }, [tg])

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: tg.themeParams.secondary_bg_color,
      }}
    >
      {routes}
    </div>
  )
}

export default App
