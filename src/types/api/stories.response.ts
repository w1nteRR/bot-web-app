import { IStory } from '../stories/stories.types'

export interface IStoriesResponse {
  stories: {
    media: IStory[]
    media_count: number
  }
}
