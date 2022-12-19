import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Title } from '../../components/ui/typography/title.ui'

import { useRecent } from '../../hooks/recent/useRecent'
import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useTelegram } from '../../hooks/telegram/useTelegram'

const DATA = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export const RecentManagePage: FC = () => {
  const navigate = useNavigate()
  useBackButton(() => navigate(-1))

  const { themeParams } = useTelegram()
  const { recentSearchList, removeUserFromRecent } = useRecent()

  return (
    <>
      <div className='py-5'>
        <Title>Recent Activity</Title>
      </div>
      {recentSearchList.map(({ pk_id, profile_image, username, full_name }) => (
        <div key={pk_id} className='flex w-full px-2 mb-5 '>
          <img
            className='bg-zinc-600 w-12 h-12 rounded-md'
            src={profile_image}
            alt=''
          />
          <div className='mx-2 flex-1'>
            <p
              className='text-md font-semibold'
              style={{ color: themeParams.text_color }}
            >
              {username}
            </p>
            <p
              className='text-xs mt-1'
              style={{ color: themeParams.hint_color }}
            >
              {full_name}
            </p>
          </div>
          <button
            style={{ color: themeParams.link_color }}
            onClick={() => removeUserFromRecent(pk_id)}
          >
            Remove
          </button>
        </div>
      ))}
    </>
  )
}
