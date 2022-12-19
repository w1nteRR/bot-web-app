import { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Overline } from '../../components/ui/typography/overline.ui'

import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useUser } from '../../hooks/queries/useUser'
import { Highlights } from '../../components/highlights/hightlights'
import { StoriesViewer } from '../../components/stories-viewer/stories.viewer'
import { useStories } from '../../hooks/queries/useStories'
import { Title } from '../../components/ui/typography/title.ui'
import { StoriesV2 } from '../../components/stories/stories-v2'

export const UserV2Page: FC = () => {
  const [isStoriesViewerOpen, setIsStoriesViewerOpen] = useState(false)

  const { username } = useParams()
  const navigate = useNavigate()

  const { themeParams, MainButton } = useTelegram()
  useBackButton(() => navigate(-1))

  const { data, isLoading } = useUser(username || '')

  MainButton.hide()

  if (isLoading) return <Overline>Loading...</Overline>

  if (!data) return <></>

  const {
    profile_image,
    biography,
    full_name,
    category,
    has_highlight_reels,
    pk_id,
  } = data

  return (
    <>
      <div className='py-10'>
        <div className='w-64 h-64 m-auto drop-shadow-2xl'>
          <img
            src={profile_image}
            alt=''
            className='rounded-md drop-shadow-2xl'
          />
        </div>
      </div>

      <div className='px-5'>
        <div className='mt-5'>
          <h2
            className='text-2xl font-bold'
            style={{ color: themeParams.text_color }}
          >
            {username}
          </h2>
          <Overline>{category}</Overline>
          <p style={{ color: themeParams.hint_color }}>{full_name}</p>

          <div className='mt-5'>
            <pre
              className='text-xs'
              style={{
                color: themeParams.hint_color,
                whiteSpace: 'break-spaces',
              }}
            >
              {biography}
            </pre>
          </div>
        </div>

        {has_highlight_reels && (
          <div className='my-12'>
            <Highlights userId={String(pk_id)} />
          </div>
        )}
      </div>
      <StoriesV2 id={String(pk_id)} />
    </>
  )
}
