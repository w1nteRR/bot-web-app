import { memo, FC } from 'react'

interface IMediaRenderProps {
  isVideo: boolean
  source: string
}

export const MediaRender: FC<IMediaRenderProps> = memo(
  ({ isVideo, source }) => {
    return isVideo ? (
      <video className='p-5 rounded' controls playsInline preload='metadata'>
        <source src={`${source}#t=0.1`} type='video/mp4' />
      </video>
    ) : (
      <img src={source} alt='preview' className='rounded p-5 my-5' />
    )
  }
)
