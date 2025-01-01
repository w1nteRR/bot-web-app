import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  getFavoritesStorage,
  setFavoritesStorage,
} from '../helpers/favorites.storage'

import { IInstagramShortUser } from '../types/user/user.types'
import { FavoritesLimits } from '../types/subscription/subscription.types'

interface IFavoritesContextProps {
  children: ReactNode
}

interface IContext {
  favorites: Array<IInstagramShortUser>
  isLoading: boolean
  remove: (id: string) => Promise<void>
  add: (user: IInstagramShortUser) => Promise<void>
  check: (id: string) => boolean
  verifyFavorites: (ids: Array<number>) => Promise<void>
}

export const FavoritesContext = createContext<IContext>({} as IContext)

export const FavoritesProvider: FC<IFavoritesContextProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Array<IInstagramShortUser>>([])
  const [isLoading, setIsLoading] = useState(true)

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

  const verifyFavorites = async (notificationIds: Array<number>) => {
    let favoritesSnapshot = [...favorites]

    const preservedFavorites = favoritesSnapshot.filter((fav) =>
      notificationIds.includes(Number(fav.id)),
    )

    const remainingFavorites = favoritesSnapshot.filter(
      (fav) => !notificationIds.includes(Number(fav.id)),
    )

    let finalFavorites

    if (preservedFavorites.length >= FavoritesLimits.Limited) {
      finalFavorites = preservedFavorites.slice(0, FavoritesLimits.Limited)
    } else {
      finalFavorites = [
        ...preservedFavorites,
        ...remainingFavorites.slice(
          0,
          FavoritesLimits.Limited - preservedFavorites.length,
        ),
      ]
    }

    const updatedFavoritesJSON = JSON.stringify(finalFavorites)

    await setFavoritesStorage(updatedFavoritesJSON)
    setFavorites(finalFavorites)
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

  const value = useMemo(
    () => ({ favorites, remove, add, check, isLoading, verifyFavorites }),
    [favorites.length, isLoading],
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
