import { useState, useEffect } from 'react'
import { useFavorites } from '../../hooks/favorites/useFavorites'

export const FavoritesCount = () => {
  const [favoritesCount, setFavoritesCount] = useState(0)

  const { count } = useFavorites()

  useEffect(() => {
    const loadFavCount = async () => {
      const favCount = await count()

      setFavoritesCount(favCount)
    }

    loadFavCount()
  }, [])

  if (!favoritesCount) return null

  return <span>{favoritesCount}</span>
}
