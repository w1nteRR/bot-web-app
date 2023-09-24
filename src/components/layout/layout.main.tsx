import { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const LayoutMain: FC = () => {
  return (
    <main className=''>
      <Outlet />
    </main>
  )
}
