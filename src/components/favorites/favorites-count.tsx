import { useFavorites } from '../../hooks/favorites/useFavorites'

export const FavoritesCount = () => {
  const { list } = useFavorites()

  if (!list.length) return null

  return <span>{list.length}</span>
}
