import { Routes, Route } from 'react-router-dom'
import { LayoutMain } from '../components/layout/layout.main'

import { HighlightPage } from '../pages/highlight/highlight.page'
import { HomeV2Page } from '../pages/home/home-v2.page'
import { RecentManagePage } from '../pages/recent-manage/recent-manage.page'
import { UserV2Page } from '../pages/user/user-v2.page'
import { UserProvider } from '../providers/user.provider'

export const useRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeV2Page />} />

      <Route element={<LayoutMain />}>
        <Route
          path='user/:username/highlight/:id'
          element={<HighlightPage />}
        />
        <Route path='recent/manage' element={<RecentManagePage />} />
      </Route>
      <Route
        path='user/:username'
        element={
          <UserProvider>
            <UserV2Page />
          </UserProvider>
        }
      />
    </Routes>
  )
}
