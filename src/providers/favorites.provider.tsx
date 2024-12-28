import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useQuery } from 'react-query'

import {
  getFavoritesStorage,
  setFavoritesStorage,
} from '../helpers/favorites.storage'

import { IInstagramShortUser } from '../types/user/user.types'
import { useWebAppUserContext } from '../hooks/context/useWebAppUserContext'
import { FavoritesLimits } from '../types/subscription/subscription.types'
import { NotificationsApi } from '../api/notifications.api'

interface IFavoritesContextProps {
  children: ReactNode
}

interface IContext {
  favorites: Array<IInstagramShortUser>
  isLoading: boolean
  remove: (id: string) => Promise<void>
  add: (user: IInstagramShortUser) => Promise<void>
  check: (id: string) => boolean
}

export const FavoritesContext = createContext<IContext>({} as IContext)

export const FavoritesProvider: FC<IFavoritesContextProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Array<IInstagramShortUser>>([])
  const [isLoading, setIsLoading] = useState(true)

  const { user } = useWebAppUserContext()

  const { data: notificationsIds, isLoading: isNotificationsLoading } =
    useQuery(
      'notifications',
      () => NotificationsApi.getNotifications(user?.id!),
      {
        retry: 0,
        select: ({ data }) => data?.ids || [],
      },
    )

  console.log('notif', notificationsIds)

  const remove = async (id: string) => {
    // if (user?.is_subscriber) {
    //   const { data } = await refetch()
    //   if (!data) return
    //
    //   const isUserTracking = data.data.ids.includes(Number(id))
    //
    //   if (isUserTracking) {
    //     showAlert('Unable to delete a tracked user.')
    //
    //     return
    //   }
    // }

    let favoritesSnapshot = [...favorites]

    favoritesSnapshot = favoritesSnapshot.filter(
      (currentUser) => currentUser.id !== id,
    )

    const updatedFavoritesJSON = JSON.stringify(favoritesSnapshot)

    await setFavoritesStorage(updatedFavoritesJSON)
    setFavorites(favoritesSnapshot)
  }

  const add = async (user: IInstagramShortUser) => {
    let favoritesSnapshot = [...favorites]

    favoritesSnapshot.push(user)

    const updatedFavoritesJSON = JSON.stringify(favoritesSnapshot)

    await setFavoritesStorage(updatedFavoritesJSON)
    setFavorites(favoritesSnapshot)
  }

  const check = (id: string): boolean => {
    const user = favorites.find((user) => user.id === id)

    return !!user
  }

  const verifyFavorites = async () => {
    if (!user) return

    const limit = user.is_subscriber
      ? FavoritesLimits.Unlimited
      : FavoritesLimits.Limited

    let favoritesSnapshot = [...favorites]
    const ids = notificationsIds || []

    // console.log('IDS', ids)

    const preservedFavorites = favoritesSnapshot.filter((fav) =>
      ids.includes(Number(fav.id)),
    )
    const remainingFavorites = favoritesSnapshot.filter(
      (fav) => !ids.includes(Number(fav.id)),
    )

    const trimmedFavorites = [
      ...preservedFavorites,
      ...remainingFavorites.slice(0, limit - preservedFavorites.length),
    ]

    // console.log('TRIMMED', trimmedFavorites)

    const updatedFavoritesJSON = JSON.stringify(trimmedFavorites)

    await setFavoritesStorage(updatedFavoritesJSON)
    setFavorites(trimmedFavorites)
  }

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const result = await getFavoritesStorage()
        setFavorites(result)
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    }

    void loadFavorites()
  }, [])

  // useEffect(() => {
  //   console.log('is', isLoa)
  //   if (!isLoa) {
  //     const run = async () => {
  //       await verifyFavorites()
  //     }
  //     void run()
  //   }
  // }, [user, isLoa])

  const value = useMemo(
    () => ({ favorites, remove, add, check, isLoading }),
    [favorites.length, isLoading],
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
