import { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Stories } from '../../components/stories/stories'
import { Highlights } from '../../components/highlights/hightlights'
import { UserWallpaper } from '../../components/user/user.wallpaper'

import { Title } from '../../components/ui/typography/title.ui'
import { Overline } from '../../components/ui/typography/overline.ui'

import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useUser } from '../../hooks/queries/useUser'

import 'swiper/css'
import { UserOverview } from '../../components/user/user.overview'

export const UserPage: FC = () => {
  const { username } = useParams()
  const navigate = useNavigate()

  const tg = useTelegram()
  useBackButton(() => navigate(-1))

  console.log('USERNAME', username)

  const { data, isLoading } = useUser(username || '')

  console.log('USER', data)

  tg.MainButton.hide()

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
      <UserWallpaper wallpaper={profile_image} />

      <div className='px-5'>
        <UserOverview
          biography={biography}
          fullName={full_name}
          username={data.username}
          category={category}
        />

        {has_highlight_reels && <Highlights userId={String(pk_id)} />}

        <Stories userId={String(pk_id)} />

        {/* <Margin>
          <Title>Posts</Title>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => (
            <Margin key={x}>
              <div className='h-96 w-full  bg-zinc-800  rounded-xl' />
            </Margin>
          ))}
        </Margin> */}
      </div>
    </>
  )
}
