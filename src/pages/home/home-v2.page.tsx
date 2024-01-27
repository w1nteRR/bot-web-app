import { FC } from 'react'

import { Header } from '../../components/header/header'
import { RecentListV3 } from '../../components/recent-list/recent-list.v3'
import { RecentListV4 } from '../../components/recent-list/recent-list.v4'
import { Tracking } from '../../components/tracking/tracking'

export const HomeV2Page: FC = () => {
  return (
    <>
      <Header />
      <RecentListV3 />
      <Tracking />
      <RecentListV4 />
    </>
  )
}
