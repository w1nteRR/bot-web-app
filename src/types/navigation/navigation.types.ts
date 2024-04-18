export enum Pages {
  Home = '/',
  Favorites = '/favorites',
  User = '/user/:username',
  NotificationsSelector = '/tracking',
  UserStories = '/user/stories/:id',
  Notifications = '/notifications',
  NotificationsSettings = 'settings',
  Subscription = '/subscription',
  NotAuthorized = '/403',
}

export interface ILocationFrom {
  from: string
  isFromSearch?: boolean
}
