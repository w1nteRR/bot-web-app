import { FC, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FavoriteCard } from './favorites.card'

import { useFavorites } from '../../hooks/favorites/useFavorites'
import { useTelegram } from '../../hooks/telegram/useTelegram'

import {
  FavoritesModeList,
  FavoritesUsers,
} from '../../types/favorites/favorites.types'
import { IFavoriteUser } from '../../types/user/user.types'

interface IFavoritesListProps {
  listMode: FavoritesModeList
}

export const FavoritesList: FC<IFavoritesListProps> = ({ listMode }) => {
  const [users, setUsers] = useState<FavoritesUsers | never[]>({})

  const { listFavoritesUsers, remove } = useFavorites()
  const { showConfirm, HapticFeedback } = useTelegram()

  const navigate = useNavigate()

  const handleUserClick = (username: string) => {
    navigate(`/user/${username}`)
  }

  const handleStoriesClick = (user: IFavoriteUser) => {
    navigate(`/user/stories/${user.id}`, { state: { user } })
  }

  const handleRemoveFavorite = async (id: string) => {
    try {
      showConfirm('Are you sure?', async (confirmed) => {
        await remove(id)

        const list = await listFavoritesUsers()

        HapticFeedback.notificationOccurred('success')

        setUsers(list)
      })
    } catch (error) {
      console.log('e', error)
    }
  }

  const parsedUsers = useMemo(() => {
    return Object.entries(users).map((user) => {
      return {
        id: user[0],
        ...JSON.parse(user[1] as string),
      }
    })
  }, [users])

  useEffect(() => {
    const loadFavorites = async () => {
      const list = await listFavoritesUsers()

      setUsers(list)
    }

    loadFavorites()
  }, [])

  return (
    <>
      {parsedUsers.map((user: IFavoriteUser) => (
        <FavoriteCard
          key={user.id}
          user={user}
          mode={listMode}
          onDeleteClick={() => handleRemoveFavorite(user.id)}
          onStoriesClick={() => handleStoriesClick(user)}
          onUserClick={() => handleUserClick(user.username)}
        />
      ))}
    </>
  )
}
