import { useTelegram } from '../telegram/useTelegram'

export const useFavorites = () => {
  const { CloudStorage, HapticFeedback, showAlert } = useTelegram()

  const add = (key: string, user: string) => {
    CloudStorage.setItem(key, user, (error, result) => {
      if (error) {
        HapticFeedback.notificationOccurred('error')
        showAlert('Something went wrong.')
      }

      if (result) {
        HapticFeedback.notificationOccurred('success')
        showAlert('User added to favorites.')
      }
    })
  }

  const listKeys = () => {
    return new Promise<string[]>((resolve, reject) => {
      CloudStorage.getKeys((error, result) => {
        if (error) reject(new Error(error))

        if (!result) reject(new Error('No result.'))

        if (result) resolve(result)
      })
    })
  }

  const listFavoritesUsers = async () => {
    const keys = await listKeys()

    if (!keys) return []

    return new Promise((resolve, reject) => {
      CloudStorage.getItems(keys, (error, result) => {
        if (error) reject(new Error(error))

        if (result) resolve(result)
      })
    })
  }

  const removeAll = async () => {
    const keys = await listKeys()

    return new Promise((resolve, reject) => {
      CloudStorage.removeItems(keys, (error, result) => {
        if (error) reject(new Error(error))

        if (result) resolve(result)
      })
    })
  }

  const remove = (key: string) => {
    return new Promise((resolve, reject) => {
      CloudStorage.removeItem(key, (error, result) => {
        if (error) reject(new Error(error))

        if (result) resolve(result)
      })
    })
  }

  const count = async () => {
    let keys = 0

    try {
      const list = await listKeys()

      keys = list.length
    } catch (error) {
      console.error(error)
    }

    return keys
  }

  const check = async (key: string) => {
    return new Promise<boolean>((resolve, reject) => {
      CloudStorage.getItem(key, (error, result) => {
        if (error) reject(new Error(error))

        if (result) resolve(true)

        resolve(false)
      })
    })
  }

  return {
    add,
    remove,
    listFavoritesUsers,
    removeAll,
    count,
    check,
  }
}
