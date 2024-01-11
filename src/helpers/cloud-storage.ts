import { IRecentUser } from '../types/user/user.types'

export enum CloudStorageKeys {
  Favorites = 'favorites',
  Recent = 'recent',
}

export class CloudStorage {
  private static readonly storage = window.Telegram.WebApp.CloudStorage

  static values(key: CloudStorageKeys): Promise<Array<IRecentUser>> {
    return new Promise((resolve, reject) => {
      this.storage.getItem(key, (error, result) => {
        if (error) reject(new Error(error))

        resolve(JSON.parse(result || '[]'))
      })
    })
  }

  static setValue(
    key: CloudStorageKeys,
    value: string
  ): Promise<boolean | undefined> {
    return new Promise<boolean | undefined>((resolve, reject) => {
      this.storage.setItem(key, value, (error, result) => {
        if (error) reject(new Error(error))

        resolve(result)
      })
    })
  }
}
