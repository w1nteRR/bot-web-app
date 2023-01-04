import { FC, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsList } from 'react-icons/bs'

import { Header } from '../../components/header/header'

import { RecentListV2 } from '../../components/recent-list/recent-list.v2'

export const HomeV2Page: FC = () => {
  return (
    <div style={{}}>
      <Header />

      <div className=''>
        <RecentListV2 />
      </div>
    </div>
  )
}
