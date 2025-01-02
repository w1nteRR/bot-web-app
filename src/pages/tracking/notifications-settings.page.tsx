import { FC, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { FiMinus } from 'react-icons/fi'
import { CgSpinnerTwoAlt } from 'react-icons/cg'
import { IoTimer } from 'react-icons/io5'

import { SpinLoader } from '../../components/ui/loaders/spin-loader'
import { Chip } from '../../components/ui/chip/chip.ui'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useGetNotificationsQuery } from '../../hooks/queries/notifications/useGetNotificationsQuery'
import { useNotificationsManagement } from '../../hooks/notifications/useNotificationsManagement'
import { useFavoritesContext } from '../../hooks/context/useFavoritesContext'

import { Pages } from '../../types/navigation/navigation.types'

import { NotificationsApi } from '../../api/notifications.api'
import { ModalVerticalV2 } from '../../components/ui/modals/modal-vertical-v2'
import { useModal } from '../../hooks/common/useModal'
import { NotificationsManageModalContent } from '../../components/notifications/notifications-manage-modal.content'
import { useWebAppUserContext } from '../../hooks/context/useWebAppUserContext'
import { useTranslation } from 'react-i18next'

const ACCOUNTS_LIMIT = 4

export const NotificationsSettingsPage: FC = () => {
  const queryClient = useQueryClient()
  const { data: notifications, isLoading } = useGetNotificationsQuery()

  const {
    themeParams,
    MainButton,
    showConfirm,
    HapticFeedback,
    onEvent,
    offEvent,
  } = useTelegram()

  const { favorites } = useFavoritesContext()
  const { open, handleModalClose: closeModal, handleModalOpen } = useModal()
  const { user } = useWebAppUserContext()
  const { t } = useTranslation()

  const updateNotificationIdsMutation = useMutation(
    NotificationsApi.updateNotificationIds,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['notifications'] })
        HapticFeedback.notificationOccurred('success')
      },

      onError: () => {
        HapticFeedback.notificationOccurred('error')
      },
    },
  )

  const {
    handleAccountClick,
    selectedNotificationsAccounts,
    setSelectedNotificationsAccounts,
  } = useNotificationsManagement()

  const navigate = useNavigate()
  useBackButton(() => navigate(Pages.Home))

  const handleAccountRemoveClick = (id: string) => {
    if (!notifications) return

    const ids = notifications
      .filter((user) => user.id != id)
      .map((x) => Number(x.id))

    showConfirm(t('notificationsPaid.removeTracking'), (confirmed) => {
      if (confirmed) {
        updateNotificationIdsMutation.mutate({ account_id: user?.id!, ids })
      }
    })
  }

  const handleAccountAddClick = () => {
    HapticFeedback.impactOccurred('medium')
    handleModalOpen()
  }

  const handleGetPremiumButton = () => {
    navigate(Pages.Subscription)
  }

  const handleModalClose = () => {
    closeModal()
    setSelectedNotificationsAccounts([])
    MainButton.hide()
  }

  const updateNotifications = () => {
    const selectedIds = selectedNotificationsAccounts.map(
      (account) => account.id,
    )

    const currentIds = notifications?.map((user) => user.id)

    if (!currentIds) return

    const ids = [...selectedIds, ...currentIds].map(Number)

    updateNotificationIdsMutation.mutate({ account_id: user?.id!, ids })

    handleModalClose()
  }

  const filteredFavorites = useMemo(() => {
    const currentNotificationsIds = notifications?.map((x) => x.id)

    return favorites.filter(
      (favorite) => !currentNotificationsIds?.includes(favorite.id),
    )
  }, [
    notifications?.length,
    favorites.length,
    selectedNotificationsAccounts.length,
  ])

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
    const total = selectedNotificationsAccounts.length + notifications?.length!

    return total === ACCOUNTS_LIMIT
  }, [selectedNotificationsAccounts.length, notifications?.length])

  if (isLoading) return <SpinLoader fullscreen />
  if (!notifications) return null

  return (
    <>
      <div className='px-3 py-5 flex flex-col gap-3.5'>
        <h1
          className='text-4xl font-bold text-center'
          style={{ color: themeParams.text_color }}
        >
          {t('notificationsPaid.title')}
        </h1>
        <p
          className='text-center font-medium text-md'
          style={{ color: themeParams.text_color }}
        >
          {t('notificationsPaid.notSubTip')}
        </p>
      </div>

      <div className='p-5'>
        <p
          className='uppercase text-sm mb-1'
          style={{ color: themeParams.subtitle_text_color }}
        >
          {t('notificationsPaid.settings.title')}
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
              <p style={{ color: themeParams.text_color }}>
                {t('notificationsPaid.settings.frequency')}
              </p>
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
            {t('notificationsPaid.tracking.section')}
          </p>

          {user?.is_subscriber && !!filteredFavorites.length && (
            <button
              style={{ color: themeParams.link_color }}
              onClick={handleAccountAddClick}
            >
              {t('common.manage')}
            </button>
          )}

          {/*{!!filteredFavorites.length && (*/}

          {/*)}*/}
        </div>

        <div
          className='px-5 py-3 rounded-xl flex flex-row items-center'
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
              notifications.length === 4 ? 'justify-center' : 'justify-start'
            } items-center w-full gap-3.5`}
          >
            {notifications.map((account) => (
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

            {!user?.is_subscriber && (
              <div
                className='py-3  flex justify-center items-center rounded-xl mx-1'
                style={{ backgroundColor: themeParams.section_bg_color }}
              >
                <div className='flex justify-between items-center w-full'>
                  <div>
                    <p
                      className='font-semibold'
                      style={{ color: themeParams.text_color }}
                    >
                      {t('notificationsPaid.tracking.title')}
                    </p>
                    <p
                      className='text-sm'
                      style={{
                        color: themeParams.subtitle_text_color,
                        cursor: 'pointer',
                      }}
                    >
                      {t('notificationsPaid.tracking.subtitle')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {!user?.is_subscriber && (
          <button
            className='mt-5 text-center w-full'
            style={{ color: themeParams.link_color }}
            onClick={handleGetPremiumButton}
          >
            {t('notificationsPaid.getPremium')}
          </button>
        )}
      </div>

      {updateNotificationIdsMutation.isLoading && (
        <div className='flex items-center justify-center mt-10 transition-transform'>
          <Chip>
            <div className='flex items-center'>
              <span
                style={{ color: themeParams.text_color }}
                className='text-xs'
              >
                {t('common.updating')}
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

      <ModalVerticalV2 open={open} onClose={handleModalClose}>
        <NotificationsManageModalContent
          favorites={filteredFavorites}
          selectedNotificationsAccounts={selectedNotificationsAccounts}
          isNotificationsAccountsLimit={isNotificationsAccountsLimit}
          onAccountClick={handleAccountClick}
        />
      </ModalVerticalV2>
    </>
  )
}
