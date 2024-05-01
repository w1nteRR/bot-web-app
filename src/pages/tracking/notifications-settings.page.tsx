import { FC, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { FiMinus } from 'react-icons/fi'
import { CgSpinnerTwoAlt } from 'react-icons/cg'
import { IoTimer } from 'react-icons/io5'

import { SpinLoader } from '../../components/ui/loaders/spin-loader'
import { ModalVertical } from '../../components/ui/modals/modal-vertical'
import { UserCard } from '../../components/shared/cards/user-card'
import { Chip } from '../../components/ui/chip/chip.ui'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useGetNotificationsQuery } from '../../hooks/queries/notifications/useGetNotificationsQuery'
import { useNotificationsManagement } from '../../hooks/notifications/useNotificationsManagement'
import { useFavoritesContext } from '../../hooks/context/useFavoritesContext'

import { Pages } from '../../types/navigation/navigation.types'

import { NotificationsApi } from '../../api/notifications.api'

export const NotificationsSettingsPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useGetNotificationsQuery()

  const {
    themeParams,
    MainButton,
    initDataUnsafe: { user },
    showConfirm,
    HapticFeedback,
    onEvent,
    offEvent,
  } = useTelegram()

  const { favorites } = useFavoritesContext()

  const updateNotificationIdsMutation = useMutation(
    NotificationsApi.updateNotificationIds,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notifications'] })
        HapticFeedback.notificationOccurred('success')
      },

      onError: () => {
        HapticFeedback.notificationOccurred('error')
      },
    }
  )

  const {
    handleAccountClick,
    selectedNotificationsAccounts,
    setSelectedNotificationsAccounts,
  } = useNotificationsManagement()

  const navigate = useNavigate()
  useBackButton(() => navigate(Pages.Home))

  const handleAccountRemoveClick = (id: string) => {
    if (!data) return

    const ids = data.filter((user) => user.id != id).map((x) => Number(x.id))

    showConfirm('Remove tracking', (confirmed) => {
      if (confirmed) {
        updateNotificationIdsMutation.mutate({ account_id: user?.id!, ids })
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

  const updateNotifications = () => {
    const selectedIds = selectedNotificationsAccounts.map(
      (account) => account.id
    )

    const currentIds = data?.map((user) => user.id)

    if (!currentIds) return

    const ids = [...selectedIds, ...currentIds].map(Number)

    updateNotificationIdsMutation.mutate({ account_id: user?.id!, ids })

    handleModalClose()
  }

  const filteredFavorites = useMemo(() => {
    const currentNotificationsIds = data?.map((x) => x.id)

    return favorites.filter(
      (favorite) => !currentNotificationsIds?.includes(favorite.id)
    )
  }, [data?.length, favorites.length, selectedNotificationsAccounts.length])

  useEffect(() => {
    MainButton.hideProgress()
    if (selectedNotificationsAccounts.length) {
      MainButton.setText('Update')
      MainButton.show()

      return
    }

    MainButton.hide()
  }, [selectedNotificationsAccounts.length])

  useEffect(() => {
    onEvent('mainButtonClicked', updateNotifications)

    return () => {
      offEvent('mainButtonClicked', updateNotifications)
    }
  }, [selectedNotificationsAccounts.length])

  const isNotificationsAccountsLimit = useMemo(() => {
    const total = selectedNotificationsAccounts.length + data?.length!

    return total === 4
  }, [selectedNotificationsAccounts.length, data?.length])

  if (isLoading) return <SpinLoader fullscreen />
  if (!data) return null

  return (
    <>
      <div className='px-3 py-5 flex flex-col gap-3.5'>
        <h1
          className='text-4xl font-bold text-center'
          style={{ color: themeParams.text_color }}
        >
          Notifications Accounts
        </h1>
        <p
          className='text-center font-medium text-md'
          style={{ color: themeParams.text_color }}
        >
          Manage Your notifications settings
        </p>
      </div>

      <div className='p-5'>
        <p
          className='uppercase text-sm mb-1'
          style={{ color: themeParams.subtitle_text_color }}
        >
          Settings
        </p>

        <div
          className='px-5 py-3 rounded-xl flex flex-col gap-3.5'
          style={{ backgroundColor: themeParams.section_bg_color }}
        >
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <div>
                <IoTimer size={28} color={themeParams.accent_text_color} />
              </div>
              <p style={{ color: themeParams.text_color }}>Frequency</p>
            </div>

            <div>
              <p style={{ color: themeParams.hint_color }}>30m</p>
            </div>
          </div>
        </div>
      </div>

      <div className='px-5 py-3'>
        <div className='flex flex-row items-center justify-between mb-1'>
          <p
            className='uppercase text-sm'
            style={{ color: themeParams.hint_color }}
          >
            Tracking accounts
          </p>

          <button
            style={{ color: themeParams.link_color }}
            onClick={handleAccountAddClick}
          >
            Manage
          </button>
        </div>

        <div
          className='px-5 py-3 rounded-xl flex  flex-row items-center'
          style={{ backgroundColor: themeParams.section_bg_color }}
        >
          {/* {data.length < 5 && (
            <button onClick={handleAccountAddClick}>
              <IoIosAddCircleOutline
                className='w-10 h-10'
                color={themeParams.link_color}
              />
            </button>
          )} */}

          <div
            className={`flex ${
              data.length === 5 ? 'justify-center' : 'justify-end'
            } items-center w-full gap-2.5`}
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

      {updateNotificationIdsMutation.isLoading && (
        <div className='flex items-center justify-center mt-10 transition-transform'>
          <Chip>
            <div className='flex items-center'>
              <span
                style={{ color: themeParams.text_color }}
                className='text-xs'
              >
                Updating
              </span>
              <CgSpinnerTwoAlt
                className='animate-spin ml-2'
                color={themeParams.link_color}
                size={13}
              />
            </div>
          </Chip>
        </div>
      )}

      <ModalVertical open={isModalOpen} onClose={handleModalClose}>
        {filteredFavorites.map((user) => {
          const isSelected = selectedNotificationsAccounts.some(
            (selectedAccount) => selectedAccount.id === user.id
          )

          return (
            <div key={user.id} className='p-3 flex justify-between'>
              <UserCard {...user} />

              <div className='flex items-center'>
                {isSelected ? (
                  <button
                    className='w-14 py-1 rounded-full flex items-center justify-center'
                    style={{ backgroundColor: themeParams.secondary_bg_color }}
                    onClick={() => handleAccountClick(user)}
                  >
                    <span
                      className='text-xs'
                      style={{ color: themeParams.text_color }}
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
