import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { RecentManageList } from '../../components/recent-manage/list/manage.list'
import { Title } from '../../components/ui/typography/title.ui'

import { useBackButton } from '../../hooks/telegram/useBackButton'

export const RecentManagePage: FC = () => {
  const navigate = useNavigate()
  useBackButton(() => navigate(-1))

  return (
    <>
      <div className='py-5 mb-5'>
        <Title>Recent Activity</Title>
      </div>
      <RecentManageList />
    </>
  )
}
