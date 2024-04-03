export enum Pages {
  Home = '/',
  Favorites = '/favorites',
  User = '/user/:username',
  UserStories = '/user/stories/:id',
  Notifications = '/notifications',
  NotificationsSettings = '/notifications/settings',
  Subscription = '/subscription',
  NotAuthorized = '/403',
}

export interface ILocationFrom {
  from: string
  isFromSearch?: boolean
}
