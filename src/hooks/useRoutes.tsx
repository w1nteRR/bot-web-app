import { Routes, Route } from 'react-router-dom'
import { LayoutMain } from '../components/layout/layout.main'

import { HighlightPage } from '../pages/highlight/highlight.page'
import { HomeV2Page } from '../pages/home/home-v2.page'
import { RecentManagePage } from '../pages/recent-manage/recent-manage.page'
import { UserProvider } from '../providers/user.provider'
import { UserStoriesPage } from '../pages/user-stories/UserStoriesPage'
import { UserPage } from '../pages/user/user.page'
import { Test } from '../pages/test.page'

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
            <UserPage />
          </UserProvider>
        }
      />
      <Route path='user/stories/:id' element={<UserStoriesPage />} />
      <Route path='test' element={<Test />} />
    </Routes>
  )
}
