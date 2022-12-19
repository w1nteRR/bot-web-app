import { memo, FC } from 'react'
import ReactPlayer from 'react-player'
import { useDevice } from '../../../hooks/useDevice'

interface IMediaRenderProps {
  isVideo: boolean
  image: string
  poster?: string
  playback?: {
    hls: string
    dash: string
  }
}

export const MediaRender: FC<IMediaRenderProps> = memo(
  ({ isVideo, image, playback, poster }) => {
    // const { dash, hls } = playback

    const os = useDevice()

    return isVideo ? (
      <ReactPlayer
        // className='react-player'
        width='100%'
        height='100%'
        controls
        light={poster}
        // preload='metadata'
        // style={{
        //   height: 100,
        //   borderRadius: 10,
        //   // objectFit: 'cover',
        //   width: 200,
        // }}
        // playsinline

        url={os === 'ios' ? playback?.hls : playback?.hls}
      >
        Video not supported.
      </ReactPlayer>
    ) : (
      <img
        src={image}
        alt='preview'
        style={{ height: '100%', borderRadius: 10, width: '100%' }}
      />
    )
  }
)
