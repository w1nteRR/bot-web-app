export enum Pages {
  Home = '/',
  Favorites = '/favorites',
  User = '/user/:username',
  UserStories = '/user/stories/:id',
  Notifications = '/notifications',
  NotificationsCreate = '/notifications/create',
}

export interface ILocationFrom {
  from: string
  isFromSearch?: boolean
}
