import { FC, useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { FiMinus } from 'react-icons/fi'
import { IoIosAddCircleOutline } from 'react-icons/io'

import { SpinLoader } from '../../components/ui/loaders/spin-loader'
import { ModalVertical } from '../../components/ui/modals/modal-vertical'
import { UserCard } from '../../components/shared/cards/user-card'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useGetNotificationsQuery } from '../../hooks/queries/notifications/useGetNotificationsQuery'
import { useFavorites } from '../../hooks/favorites/useFavorites'
import { useNotificationsManagement } from '../../hooks/notifications/useNotificationsManagement'
import { useNotifications } from '../../hooks/notifications/useNotifications'

import { Pages } from '../../types/navigation/navigation.types'

import { NotificationsApi } from '../../api/notifications.api'

export const NotificationsSettingsPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const queryClient = useQueryClient()
  const { data, isFetching } = useGetNotificationsQuery()
  const mutation = useMutation(NotificationsApi.removeNotification, {
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  })

  const {
    themeParams,
    MainButton,
    initDataUnsafe: { user },
    showConfirm,
    HapticFeedback,
    onEvent,
    offEvent,
  } = useTelegram()

  const { list } = useFavorites()
  const { create } = useNotifications()
  const {
    handleAccountClick,
    selectedNotificationsAccounts,
    setSelectedNotificationsAccounts,
  } = useNotificationsManagement()

  const navigate = useNavigate()
  useBackButton(() => navigate(Pages.Home))

  const handleAccountRemoveClick = (id: string) => {
    showConfirm('Remove tracking', (confirmed) => {
      if (confirmed) {
        mutation.mutate({ account_id: String(user?.id!), id })
      }
    })
  }

  const handleAccountAddClick = () => {
    HapticFeedback.impactOccurred('medium')
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedNotificationsAccounts([])
    MainButton.hide()
  }

  const createNotifications = async () => {
    const selectedIds = selectedNotificationsAccounts.map(
      (account) => account.id,
    )
    await create(selectedIds)

    handleModalClose()
  }

  const filteredFavorites = useMemo(() => {
    const currentNotificationsIds = data?.map((x) => x.id)

    return list.filter(
      (favorite) => !currentNotificationsIds?.includes(favorite.id),
    )
  }, [data?.length, list.length, selectedNotificationsAccounts.length])

  useEffect(() => {
    if (selectedNotificationsAccounts.length) {
      MainButton.show()

      return
    }

    MainButton.hide()
  }, [selectedNotificationsAccounts.length])

  useEffect(() => {
    onEvent('mainButtonClicked', createNotifications)

    return () => {
      offEvent('mainButtonClicked', createNotifications)
    }
  }, [selectedNotificationsAccounts.length])

  const isNotificationsAccountsLimit = useMemo(() => {
    const total = selectedNotificationsAccounts.length + data?.length!

    return total === 5
  }, [selectedNotificationsAccounts.length, data?.length])

  if (isFetching) return <SpinLoader fullscreen />

  if (!data?.length) return <Navigate to={Pages.Home} />

  return (
    <>
      <div className='px-5'>
        <p
          className='uppercase text-sm mb-1'
          style={{ color: themeParams.hint_color }}
        >
          Tracking accounts
        </p>
        <div
          className='px-5 py-3 rounded-xl flex  flex-row items-center'
          style={{ backgroundColor: themeParams.secondary_bg_color }}
        >
          {data.length < 5 && (
            <button onClick={handleAccountAddClick}>
              <IoIosAddCircleOutline
                className='w-10 h-10'
                color={themeParams.link_color}
              />
            </button>
          )}

          <div
            className={`flex ${data.length === 5 ? 'justify-center' : 'justify-end'} items-center w-full gap-2.5`}
          >
            {data.map((account) => (
              <div
                key={account.id}
                className='relative'
                onClick={() => handleAccountRemoveClick(account.id)}
              >
                <div
                  className='w-5 h-5 rounded-full absolute -top-1.5 flex items-center justify-center'
                  style={{ backgroundColor: themeParams.secondary_bg_color }}
                >
                  <FiMinus className='text-lg' color={themeParams.text_color} />
                </div>
                <img
                  key={account.id}
                  className='w-14 h-14 bg-gray-700 rounded-full'
                  src={account.profile_image}
                  alt={''}
                />

                <p
                  className='text-xs truncate w-14 py-1'
                  style={{ color: themeParams.text_color }}
                >
                  {account.username}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ModalVertical open={isModalOpen} onClose={handleModalClose}>
        {filteredFavorites.map((user) => {
          const isSelected = selectedNotificationsAccounts.some(
            (selectedAccount) => selectedAccount.id === user.id,
          )

          return (
            <div key={user.id} className='p-3 flex justify-between'>
              <UserCard {...user} />

              <div className='flex items-center'>
                {isSelected ? (
                  <button
                    className='w-14 py-1 rounded-full flex items-center justify-center'
                    style={{ backgroundColor: themeParams.bg_color }}
                    onClick={() => handleAccountClick(user)}
                  >
                    <span
                      className='text-xs'
                      style={{ color: themeParams.button_text_color }}
                    >
                      Remove
                    </span>
                  </button>
                ) : (
                  <button
                    disabled={isNotificationsAccountsLimit}
                    className='w-14 py-1 rounded-full flex items-center justify-center'
                    style={{ backgroundColor: themeParams.button_color }}
                    onClick={() => handleAccountClick(user)}
                  >
                    <span
                      className='text-xs'
                      style={{ color: themeParams.button_text_color }}
                    >
                      Add
                    </span>
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </ModalVertical>
    </>
  )
}
