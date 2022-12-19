import { FC } from 'react'

import { Overline } from '../ui/typography/overline.ui'
import { Title } from '../ui/typography/title.ui'

interface IUserOverviewProps {
  username: string
  category: string
  fullName: string
  biography: string
}

export const UserOverview: FC<IUserOverviewProps> = ({
  username,
  category,
  fullName,
  biography,
}) => {
  return (
    <>
      <Title>{username}</Title>
      <div className='mt-1'>
        <Overline>{category}</Overline>
      </div>

      <div className=''>
        <p className='text-zinc-400 text-md my-3'>{fullName}</p>
        <p className='text-slate-50 text-md my-3'>
          <pre>{biography}</pre>
        </p>
      </div>
    </>
  )
}
