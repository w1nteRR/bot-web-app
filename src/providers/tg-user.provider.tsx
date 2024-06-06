import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { WebAppUser } from '@twa-dev/types'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { useTelegram } from '../hooks/telegram/useTelegram'
import { AuthApi } from '../api/auth.api'
import { Pages } from '../types/navigation/navigation.types'

interface IUserContextProps {
  children: ReactNode
}

interface IWebAppUser extends WebAppUser {
  is_subscriber: boolean
}

interface IContext {
  user: IWebAppUser | null
  isLoading: boolean
}

export const WebAppUserContext = createContext<IContext>({} as IContext)

export const WebAppUserProvider: FC<IUserContextProps> = ({ children }) => {
  const [user, setUser] = useState<null | IWebAppUser>(null)

  const { isLoading } = useQuery(
    ['user'],
    () => AuthApi.validate(tg.initData),
    {
      onSuccess: ({ data }) => {
        const user = {
          ...data.user,
          is_subscriber: data.is_subscriber,
        }

        setUser(user as IWebAppUser)
      },

      onError: () => {
        navigate(Pages.NotAuthorized)
      },
    },
  )

  const tg = useTelegram()
  const navigate = useNavigate()

  const value = useMemo(
    () => ({
      user,
      isLoading,
    }),
    [user],
  )

  return (
    <WebAppUserContext.Provider value={value}>
      {!isLoading && children}
    </WebAppUserContext.Provider>
  )
}
