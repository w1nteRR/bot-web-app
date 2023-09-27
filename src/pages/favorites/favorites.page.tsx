import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FavoriteCard } from '../../components/favorites/favorites.card'
import { ModeButton } from '../../components/favorites/mode.button'

import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useFavorites } from '../../hooks/favorites/useFavorites'
import { useTelegram } from '../../hooks/telegram/useTelegram'

import { IFavoriteUser } from '../../types/user/user.types'
import { FavoritesModeList } from '../../types/favorites/favorites.types'

export const FavoritesPage: FC = () => {
  const [users, setUsers] = useState<unknown>({})
  const [listMode, setListMode] = useState<FavoritesModeList>('stories')

  const navigate = useNavigate()

  const { listFavoritesUsers, remove } = useFavorites()
  const { showConfirm, HapticFeedback } = useTelegram()

  useBackButton(() => navigate(-1))

  useEffect(() => {
    const loadFavorites = async () => {
      const list = await listFavoritesUsers()

      setUsers(list)
    }

    loadFavorites()
  }, [])

  //@ts-ignore
  const parsedUsers = Object.entries(users).map((user) => {
    return {
      id: user[0],
      ...JSON.parse(user[1] as string),
    }
  })

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

  // const removeAllHandler = async () => {
  //   try {
  //     await removeAll()

  //     const list = await listFavoritesUsers()

  //     setUsers(list)
  //   } catch (error) {
  //     console.log('e', error)
  //   }
  // }

  const handleListModeButton = (mode: FavoritesModeList) => {
    setListMode(mode)
  }

  const handleUserClick = (username: string) => {
    navigate(`/user/${username}`)
  }

  const handleStoriesClick = (user: IFavoriteUser) => {
    navigate(`/user/stories/${user.id}`, { state: { user } })
  }

  return (
    <>
      <div className='flex justify-end items-center p-3'>
        <ModeButton mode={listMode} onClick={handleListModeButton} />
      </div>

      <div className='pt-10'>
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
      </div>
    </>
  )
}
