import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CgStories } from 'react-icons/cg'
import { RxCross2 } from 'react-icons/rx'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useFavorites } from '../../hooks/favorites/useFavorites'

type ListMode = 'stories' | 'manage'

export const FavoritesPage: FC = () => {
  const [users, setUsers] = useState<unknown>({})
  const [listMode, setListMode] = useState<ListMode>('stories')

  const navigate = useNavigate()
  const { themeParams } = useTelegram()

  const { listFavoritesUsers, remove } = useFavorites()

  useBackButton(() => navigate(-1))

  useEffect(() => {
    const loadFavorites = async () => {
      const list = await listFavoritesUsers()

      setUsers(list)
    }

    loadFavorites()
  }, [])

  //@ts-ignore
  const tt = Object.entries(users).map((user) => {
    return {
      id: user[0],
      ...JSON.parse(user[1] as string),
    }
  })

  const removeFavorite = async (id: string) => {
    try {
      await remove(id)

      const list = await listFavoritesUsers()

      setUsers(list)
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

  const handleListModeButton = (mode: ListMode) => {
    setListMode(mode)
  }

  return (
    <>
      <div className='flex justify-end items-center p-3'>
        {listMode === 'stories' ? (
          <button
            className='bg-transparet'
            onClick={() => handleListModeButton('manage')}
          >
            <span style={{ color: themeParams.link_color }}>Manage</span>
          </button>
        ) : (
          <button onClick={() => handleListModeButton('stories')}>
            <span style={{ color: themeParams.link_color }}>Stories</span>
          </button>
        )}
      </div>

      <div className='pt-10'>
        {tt.map((user) => (
          <div className='flex justify-between items-center px-2' key={user.id}>
            <div className='flex my-3'>
              <img
                src={user.profile_image}
                alt='avatar'
                className='w-12 h-12 mr-2 rounded-full'
              />
              <div className='flex flex-col items-start justify-center'>
                <p
                  className='font-bold text-sm'
                  style={{ color: themeParams.text_color }}
                >
                  {user.username}
                </p>
                <p
                  className='text-xs'
                  style={{ color: themeParams.hint_color }}
                >
                  {user.full_name}
                </p>
              </div>
            </div>
            {listMode === 'stories' ? (
              <button>
                <CgStories size={22} color={themeParams.hint_color} />
              </button>
            ) : (
              <button onClick={() => removeFavorite(user.id)}>
                <RxCross2 size={20} color={themeParams.hint_color} />
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
