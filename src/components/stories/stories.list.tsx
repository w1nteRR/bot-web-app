import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { MediaRender } from '../shared/media-render/media-render.shared'
import { convertUnixTimestamp } from '../../helpers/story-timestamp'

import { useTelegram } from '../../hooks/telegram/useTelegram'

import { IStory } from '../../types/stories/stories.types'
import { Pages } from '../../types/navigation/navigation.types'

interface IStoriesListProps {
  stories: IStory[]
}

export const StoriesList: FC<IStoriesListProps> = ({ stories }) => {
  const { themeParams } = useTelegram()
  const navigate = useNavigate()

  const handleMentionClick = (username: string) => {
    navigate(`${Pages.User.replace(':username', username)}`, {
      state: { from: location.pathname },
    })
  }

  return stories.map((story) => (
    <div key={story.id} className='px-5'>
      <MediaRender
        source={story.url || story.videoPath || ''}
        isVideo={story.is_video}
      />

      <div className='p-3 pb-10'>
        <p className='text-sm' style={{ color: themeParams.text_color }}>
          {convertUnixTimestamp(story.taken_at)}
        </p>

        <div className='my-5 flex flex-wrap'>
          {story.story_bloks_stickers?.map(
            ({ bloks_sticker: { sticker_data } }) => (
              <div
                key={sticker_data.ig_mention.account_id}
                onClick={() =>
                  handleMentionClick(sticker_data.ig_mention.username)
                }
                className='px-3 py-1 text-sm mr-3 my-1 w-fit rounded-full'
                style={{
                  backgroundColor: themeParams.secondary_bg_color,
                  color: themeParams.text_color,
                }}
              >
                @{sticker_data.ig_mention.username}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  ))
}
