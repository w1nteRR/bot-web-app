import { FC } from 'react'
import { IStory } from '../../types/stories/stories.types'
import { MediaRender } from '../shared/media-render/media-render.shared'

interface IStoriesListProps {
  stories: IStory[]
}

export const StoriesList: FC<IStoriesListProps> = ({ stories }) => {
  return stories.map((story) => (
    <div key={story.id}>
      <MediaRender
        source={story.url || story.videoPath || ''}
        isVideo={story.is_video}
      />
    </div>
  ))
}
