import { Id } from '../common'

export interface IUser {
  username: string
  full_name: string
  biography: string
  pk_id: number
  media_count: number
  follower_count: number
  following_count: number
  profile_image: string
  category: string
  has_highlight_reels: boolean
}
