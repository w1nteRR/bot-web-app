import { FC, useRef } from 'react'

import { useUserContext } from '../../hooks/context/useUserContext'
import { useImageBackground } from '../../hooks/useImageBackground'

export const UserOverview: FC = () => {
  const ref = useRef(null)

  // const { user } = useUserContext()
  const { color, onLoad, isDark } = useImageBackground(ref)

  // if (!user) return null

  return (
    <div
      className='pt-10'
      style={{
        backgroundColor: `rgb(${color.toString()})`,
        minHeight: '65vh',
      }}
    >
      <div className='w-52 h-52 m-auto drop-shadow-2xl'>
        <img
          ref={ref}
          src={
            'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
          }
          alt=''
          className='rounded-md drop-shadow-2xl'
          onLoad={onLoad}
        />
      </div>
      <div className='mt-5 px-5'>
        <div className='text-center'>
          <h2
            className='text-xl mb-4 font-semibold'
            style={{ color: isDark(color) ? 'silver' : '#1c1c1c' }}
          >
            name
            {/* {user.username} */}
          </h2>
        </div>
        <p
          className='text-sm font-semibold'
          style={{ color: isDark(color) ? 'silver' : '#1c1c1c' }}
        >
          full name
          {/* {user.full_name} */}
        </p>

        <div className='mt-5'>
          <pre
            className='text-xs'
            style={{
              color: isDark(color) ? 'silver' : '#1c1c1c',
              whiteSpace: 'break-spaces',
            }}
          >
            biography
            {/* {user.biography} */}
          </pre>
        </div>

        <ul className='mt-5 flex flex-row'>
          {/* {user.category && ( */}
          <li
            className='text-xs mr-2'
            style={{ color: isDark(color) ? 'silver' : '#1c1c1c' }}
          >
            &#x2022; category
          </li>
          {/* )} */}

          <li
            className='text-xs mr-2'
            style={{ color: isDark(color) ? 'silver' : '#1c1c1c' }}
          >
            &#x2022;{' '}
            <span className='font-semibold'>
              {/* {user.follower_count */}
              212
            </span>{' '}
            followers
          </li>
          <li
            className='text-xs mr-2'
            style={{ color: isDark(color) ? 'silver' : '#1c1c1c' }}
          >
            &#x2022;{' '}
            <span className='font-semibold'>
              {/* {user.following_count} */}
              342
            </span>{' '}
            following
          </li>
        </ul>
      </div>
    </div>
  )
}
