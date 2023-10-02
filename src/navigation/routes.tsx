import { RouteObject } from 'react-router-dom'

import { HomeV2Page } from '../pages/home/home-v2.page'
import { FavoritesPage } from '../pages/favorites/favorites.page'
import { UserPage } from '../pages/user/user.page'
import { UserStoriesPage } from '../pages/user-stories/UserStoriesPage'
import { Pages } from '../types/navigation/navigation.types'

export const routes: RouteObject[] = [
  {
    path: Pages.Home,
    element: <HomeV2Page />,
  },
  {
    path: Pages.Favorites,
    element: <FavoritesPage />,
  },
  {
    path: Pages.User,
    element: <UserPage />,
  },
  {
    path: Pages.UserStories,
    element: <UserStoriesPage />,
  },
]
