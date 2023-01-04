import { createContext, FC, ReactNode, useMemo, useState } from 'react'
import { IUser } from '../types/user/user.types'

interface IUserContextProps {
  children: ReactNode
}

interface IContext {
  user: IUser | null
  initUser: (user: IUser) => void
}

export const UserContext = createContext<IContext>({} as IContext)

export const UserProvider: FC<IUserContextProps> = ({ children }) => {
  const [user, setUser] = useState<null | IUser>(null)

  const initUser = (user: IUser) => setUser(user)

  const value = useMemo(
    () => ({
      initUser,
      user,
    }),
    [user]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
