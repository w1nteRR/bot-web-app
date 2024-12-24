export enum Pages {
  Home = '/',
  Favorites = '/favorites',
  User = '/user/:username',
  NotificationsSelector = '/tracking',
  UserStories = '/user/stories/:id',
  Notifications = '/notifications',
  NotificationsSettings = 'settings',
  Subscription = '/subscription',
  SubscriptionPaid = 'paid',
  SubscriptionCheckout = 'checkout',
  NotAuthorized = '/403',
  NotFound = '/not-found',
}

export interface ILocationFrom {
  from: string
  isFromSearch?: boolean
}
