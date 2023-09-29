import { IRecentUser } from '../user/user.types'

export enum CloudStorageKeys {
  Favorites = 'favorites',
}

export type FavoritesModeList = 'manage' | 'stories'

export type FavoritesUsers = {
  [key: string]: string
}

export interface IFavoriteUser extends IRecentUser {}
export type FavoritesUserList = Array<IFavoriteUser>
