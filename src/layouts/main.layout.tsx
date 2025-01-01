import React, { FC } from 'react'
import { useRoutes } from 'react-router-dom'

import { SpinLoader } from '../components/ui/loaders/spin-loader'

import { routes } from '../navigation/routes'
import { useWebAppUserContext } from '../hooks/context/useWebAppUserContext'
import { useMessages } from '../hooks/messages/useMessages'

export const MainLayout: FC = () => {
  const element = useRoutes(routes)
  const { isLoading } = useWebAppUserContext()
  useMessages()

  if (isLoading) return <SpinLoader fullscreen />

  return <div className='max-w-md m-auto'>{element}</div>
}
