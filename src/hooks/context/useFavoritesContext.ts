import { useContext } from 'react'
import { FavoritesContext } from '../../providers/favorites.provider'

export const useFavoritesContext = () => useContext(FavoritesContext)
