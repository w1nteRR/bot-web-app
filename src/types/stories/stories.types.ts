export interface IStory {
  expiring_at: number
  taken_at: number
  id: string
  is_video: boolean
  pk: number
  url?: string
  videoPath?: string
  story_bloks_stickers: IStoryBlockStickers[]
}

interface IBloksStikcer {
  id: string
  app_id: string
  bloks_sticker_type: string
  sticker_data: {
    ig_mention: {
      account_id: string
      username: string
      full_name: string
      profile_pic_url: null
    }
  }
}

interface IStoryBlockStickers {
  bloks_sticker: IBloksStikcer
  x: number
  y: number
  z: number
  width: number
  height: number
  rotation: number
}

export type StoriesList = Array<IStory>
