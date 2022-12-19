import { FC } from 'react'

interface IUserWallpaperProps {
  wallpaper: string
}

export const UserWallpaper: FC<IUserWallpaperProps> = ({ wallpaper }) => {
  return (
    <div className='relative'>
      <div
        className='w-full h-full z-10 absolute bottom-0'
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, #000000 99.48%)',
        }}
      />
      <img
        src={wallpaper}
        alt='user wallpaper'
        className='brightness-50 w-full'
        // style={{ height: 400 }}
      />
    </div>
  )
}
