import { FC } from 'react'

import { Header } from '../../components/header/header'
import { RecentListV2 } from '../../components/recent-list/recent-list.v2'
import { RecentList } from '../../components/recent-list/recent.list'
import { SearchForm } from '../../components/search-form/search.form'
import { Title } from '../../components/ui/typography/title.ui'

export const HomePage: FC = () => {
  return (
    <>
      <Header />

      {/* <Stories /> */}
      <SearchForm />

      <Title>test</Title>

      {/* <div className='my-10'> */}
      <RecentListV2 />
      {/* <RecentList /> */}
      {/* </div> */}
    </>
  )
}
