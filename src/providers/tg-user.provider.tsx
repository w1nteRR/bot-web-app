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
import { SpinLoader } from '../components/ui/loaders/spin-loader'

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
  updateSubscriptionStatus: (status: boolean) => void
}

export const WebAppUserContext = createContext<IContext>({} as IContext)

export const WebAppUserProvider: FC<IUserContextProps> = ({ children }) => {
  const [user, setUser] = useState<null | IWebAppUser>(null)

  const tg = useTelegram()
  const navigate = useNavigate()

  const updateSubscriptionStatus = (status: boolean) => {
    const updateCandidate = {
      ...user,
      is_subscriber: status
    }

    setUser(updateCandidate as IWebAppUser)
  }

  const { isLoading } = useQuery(
    ['user'],
    () => AuthApi.validate(tg.initData),
    {
      retry: 1,

      onSuccess: ({ data }) => {
        const user = {
          ...data.user,
          is_subscriber: data.is_subscriber,
        }

        setUser(user as IWebAppUser)
      },

      onError: () => {
        navigate(Pages.NotAuthorized, { replace: true })
      },
    },
  )

  const value = useMemo(
    () => ({
      user,
      isLoading,
      updateSubscriptionStatus
    }),
    [user, isLoading],
  )

  return (
    <WebAppUserContext.Provider value={value}>
      {isLoading ? <SpinLoader fullscreen /> : children}
    </WebAppUserContext.Provider>
  )
}
