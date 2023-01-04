import { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Overline } from '../../components/ui/typography/overline.ui'

import { UserOverview } from '../../components/user/user.overview'
import { Tabs } from '../../components/user/user.tabs'

import { useUserContext } from '../../hooks/context/useUserContext'
import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useUser } from '../../hooks/queries/useUser'

export const UserV2Page: FC = () => {
  const { username } = useParams()
  const navigate = useNavigate()
  useBackButton(() => navigate(-1))

  const { initUser } = useUserContext()
  const { MainButton } = useTelegram()

  const { data, isLoading } = useUser(username || '')

  useEffect(() => {
    if (data) initUser(data)
  }, [data])

  MainButton.hide()

  if (isLoading) return <Overline>Loading...</Overline>

  return (
    <>
      <UserOverview />
      <Tabs />
    </>
  )
}
