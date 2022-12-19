import React, { useEffect } from 'react'

import { useRoutes } from './hooks/useRoutes'
import { useTelegram } from './hooks/telegram/useTelegram'

function App() {
  const tg = useTelegram()
  const routes = useRoutes()

  const {
    initDataUnsafe: { user },
  } = tg

  console.log('ready', tg.ready())

  useEffect(() => {
    tg.ready()
    tg.expand()
    console.log('tg', tg.initDataUnsafe)
    console.log('color', tg.colorScheme)
  }, [tg])

  const backgroundColor = tg.colorScheme === 'dark' ? '#000' : '#fff'

  return <div style={{ backgroundColor, minHeight: '100vh' }}>{routes}</div>
}

export default App
