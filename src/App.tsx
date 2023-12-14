import React, { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'

import { useTelegram } from './hooks/telegram/useTelegram'
import { routes } from './navigation/routes'

function App() {
  const tg = useTelegram()
  const element = useRoutes(routes)

  useEffect(() => {
    tg.ready()
    tg.expand()

    // tg.setBackgroundColor(tg.themeParams.bg_color)
  }, [tg])

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: tg.themeParams.bg_color,
      }}
    >
      {element}
    </div>
  )
}

export default App
