import { useState } from 'react'
import { IFavoriteUser } from '../../types/favorites/favorites.types'

export const useNotificationsManagement = () => {
  const [selectedNotificationsAccounts, setSelectedNotificationsAccounts] =
    useState<Array<IFavoriteUser>>([])

  const remove = (accountId: string) => {
    const updatedSelectedAccounts = selectedNotificationsAccounts.filter(
      (account) => account.id !== accountId,
    )

    setSelectedNotificationsAccounts(updatedSelectedAccounts)
  }

  const add = (account: IFavoriteUser) => {
    setSelectedNotificationsAccounts((prevSelected) => [
      ...prevSelected,
      account,
    ])
  }

  const handleAccountClick = (account: IFavoriteUser) => {
    const isAdded = selectedNotificationsAccounts.some(
      (currentAccount) => currentAccount.id === account.id,
    )

    if (isAdded) {
      remove(account.id)

      return
    }

    add(account)
  }

  return {
    handleAccountClick,
    selectedNotificationsAccounts,
    setSelectedNotificationsAccounts,
  }
}
