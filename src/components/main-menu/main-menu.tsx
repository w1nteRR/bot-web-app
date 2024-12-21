import { FC } from 'react'
import { SubscriptionButton } from '../subscription/subscription.button'
import { Tracking } from '../tracking/tracking'

export const MainMenu: FC = () => {
  return (
    <>
      <Tracking />
      <SubscriptionButton />
    </>
  )
}
