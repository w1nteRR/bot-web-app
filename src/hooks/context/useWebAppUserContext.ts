import { useContext } from 'react'
import { WebAppUserContext } from '../../providers/tg-user.provider'

export const useWebAppUserContext = () => useContext(WebAppUserContext)
