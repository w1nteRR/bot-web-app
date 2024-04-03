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

interface IFavoritesContextProps {
  children: ReactNode
}

interface IContext {
  favorites: Array<IInstagramShortUser>
  remove: (id: string) => Promise<void>
  add: (user: IInstagramShortUser) => Promise<void>
  check: (id: string) => boolean
}

export const FavoritesContext = createContext<IContext>({} as IContext)

export const FavoritesProvider: FC<IFavoritesContextProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Array<IInstagramShortUser>>([])

  const remove = async (id: string) => {
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

  useEffect(() => {
    const loadFavorites = async () => {
      const result = await getFavoritesStorage()

      setFavorites(result)
    }

    loadFavorites()
  }, [])

  const value = useMemo(
    () => ({ favorites, remove, add, check }),
    [favorites.length],
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
