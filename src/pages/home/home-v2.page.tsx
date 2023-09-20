import { FC } from 'react'

import { Header } from '../../components/header/header'
import { RecentListV3 } from '../../components/recent-list/recent-list.v3'
import { Menu } from '../../components/menu/menu'

export const HomeV2Page: FC = () => {
  return (
    <>
      <Header />
      <RecentListV3 />
      <Menu />
    </>
  )
}
