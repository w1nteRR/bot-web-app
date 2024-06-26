import {
  CloudStorageKeys,
  FavoritesUserList,
} from '../types/favorites/favorites.types'

export const getFavoritesStorage = () => {
  return new Promise<FavoritesUserList>((resolve, reject) => {
    window.Telegram.WebApp.CloudStorage.getItem(
      CloudStorageKeys.Favorites,
      (error, result) => {
        if (error) reject(new Error(error))

        resolve(JSON.parse(result || '[]'))
      },
    )
  })
}

export const setFavoritesStorage = (value: string) => {
  return new Promise<boolean | undefined>((resolve, reject) => {
    window.Telegram.WebApp.CloudStorage.setItem(
      CloudStorageKeys.Favorites,
      value,
      (error, result) => {
        if (error) reject(new Error(error))

        resolve(result)
      },
    )
  })
}
