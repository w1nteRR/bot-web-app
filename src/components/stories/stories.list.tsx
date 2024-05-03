import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoCloudDownloadOutline, IoCloudDoneOutline } from 'react-icons/io5'

import { SpinLoader } from '../ui/loaders/spin-loader'
import { MediaRender } from '../shared/media-render/media-render.shared'
import { convertUnixTimestamp } from '../../helpers/story-timestamp'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useDownloadStory } from '../../hooks/stories/useDownloadStory'

import { IStory } from '../../types/stories/stories.types'
import { Pages } from '../../types/navigation/navigation.types'

interface IStoriesListProps {
  stories: IStory[]
}

export const StoriesList: FC<IStoriesListProps> = ({ stories }) => {
  const { themeParams, HapticFeedback } = useTelegram()
  const navigate = useNavigate()

  const { download, mutation } = useDownloadStory()

  const handleMentionClick = (username: string) => {
    navigate(`${Pages.User.replace(':username', username)}`, {
      state: { from: location.pathname },
    })
  }

  const handleDownloadClick = async (story: IStory) => {
    HapticFeedback.impactOccurred('light')
    await download(story)
  }

  return stories.map((story) => (
    <div key={story.id} className='px-5'>
      <MediaRender
        source={story.url || story.videoPath || ''}
        isVideo={story.is_video}
      />

      <div className='p-3 pb-10'>
        <div className='flex items-center justify-between'>
          <p className='text-sm' style={{ color: themeParams.text_color }}>
            {convertUnixTimestamp(story.taken_at)}
          </p>
          <button
            style={{ color: themeParams.button_color }}
            className='text-sm'
          >
            <>
              {mutation.variables?.story_id === story.id &&
              mutation.isLoading ? (
                <SpinLoader size={24} />
              ) : (
                <>
                  {mutation.variables?.story_id === story.id &&
                  !mutation.isSuccess ? (
                    <IoCloudDoneOutline size={24} />
                  ) : (
                    <IoCloudDownloadOutline
                      size={24}
                      onClick={() => handleDownloadClick(story)}
                    />
                  )}
                </>
              )}
            </>
          </button>
        </div>

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
                  backgroundColor: themeParams.section_bg_color,
                  color: themeParams.text_color,
                }}
              >
                @{sticker_data.ig_mention.username}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  ))
}
