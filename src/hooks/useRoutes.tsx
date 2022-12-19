import { Routes, Route } from 'react-router-dom'
import { LayoutMain } from '../components/layout/layout.main'

import { HighlightPage } from '../pages/highlight/highlight.page'
import { HomeV2Page } from '../pages/home/home-v2.page'
import { RecentManagePage } from '../pages/recent-manage/recent-manage.page'
import { UserV2Page } from '../pages/user/user-v2.page'
import { UserPage } from '../pages/user/user.page'

export const useRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeV2Page />} />

      <Route element={<LayoutMain />}>
        <Route path='highlight/:id' element={<HighlightPage />} />
        <Route path='recent/manage' element={<RecentManagePage />} />
      </Route>
      <Route path='user/:username' element={<UserV2Page />} />
    </Routes>
  )
}
