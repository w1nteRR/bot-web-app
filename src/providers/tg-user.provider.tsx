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

  const { data, isLoading, refetch } = useQuery(
    ['user'],
    () => AuthApi.validate(tg.initData),
    {
      enabled: false,
      onSuccess: (data) => data.data,
    },
  )

  const tg = useTelegram()
  const navigate = useNavigate()

  const validateUser = async () => {
    try {
      const { data } = await refetch()

      return {
        ...data?.data.user,
        is_subscriber: data?.data.is_subscriber,
      }
    } catch (error) {
      throw error
    }
  }

  const value = useMemo(
    () => ({
      user,
      isLoading,
    }),
    [user],
  )

  useEffect(() => {
    validateUser()
      .then((user) => setUser(user as IWebAppUser))
      .catch(() => navigate(Pages.NotAuthorized))
  }, [user?.id])

  return (
    <WebAppUserContext.Provider value={value}>
      {children}
    </WebAppUserContext.Provider>
  )
}
