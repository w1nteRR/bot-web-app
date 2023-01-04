import { memo, FC } from 'react'

interface IMediaRenderProps {
  isVideo: boolean
  source: string
}

export const MediaRender: FC<IMediaRenderProps> = memo(
  ({ isVideo, source }) => {
    console.log('REJDER')

    return isVideo ? (
      <video
        // width='100%'
        // height='100%'
        controls
        playsInline
        preload='metadata'
        style={{
          // height: 100,
          borderRadius: 10,
          objectFit: 'contain',
          width: '100%',
          height: '100%',
          // width: 200,
        }}
      >
        <source src={`${source}#t=0.1`} type='video/mp4' />
      </video>
    ) : (
      <img
        src={source}
        alt='preview'
        className='rounded-xl w-full h-full'
        style={{
          objectFit: 'contain',
        }}
      />
    )
  }
)
