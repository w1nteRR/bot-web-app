import { RouteObject } from 'react-router-dom'

import { HomeV2Page } from '../pages/home/home-v2.page'
import { UserPage } from '../pages/user/user.page'
import { UserStoriesPage } from '../pages/user-stories/UserStoriesPage'
import { NotificationsPage } from '../pages/tracking/notifications.page'
import { NotificationsSettingsPage } from '../pages/tracking/notifications-settings.page'
import { SubscriptionPage } from '../pages/subscription/subscription.page'
import { NotAuthorizedPage } from '../pages/misc/403.page'

import { Pages } from '../types/navigation/navigation.types'
import { NotificationsLayout } from '../layouts/notifications.layout'

export const routes: RouteObject[] = [
  {
    path: Pages.Home,
    element: <HomeV2Page />,
  },
  {
    path: Pages.User,
    element: <UserPage />,
  },
  {
    path: Pages.UserStories,
    element: <UserStoriesPage />,
  },
  {
    path: Pages.NotificationsSelector,
    element: <NotificationsPage />,
  },
  {
    path: Pages.Notifications,
    element: <NotificationsLayout />,

    children: [
      {
        path: Pages.NotificationsSettings,
        element: <NotificationsSettingsPage />,
        index: true,
      },
    ],
  },

  {
    path: Pages.Subscription,
    element: <SubscriptionPage />,
  },

  {
    path: Pages.NotAuthorized,
    element: <NotAuthorizedPage />,
  },
]
