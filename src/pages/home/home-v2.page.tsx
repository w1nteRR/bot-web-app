import { FC, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsList } from 'react-icons/bs'

import { Header } from '../../components/header/header'

import { Margin } from '../../components/ui/spacing/margin.ui'
import { Title } from '../../components/ui/typography/title.ui'

import { RecentList } from '../../components/recent-list/recent.list'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { RecentListV2 } from '../../components/recent-list/recent-list.v2'
import { useStories } from '../../hooks/queries/useStories'
import axios from 'axios'
import { IStory } from '../../types/stories/stories.types'

export const HomeV2Page: FC = () => {
  return (
    <div style={{}}>
      <Header />

      <div className=''>
        {/* <RecentList /> */}
        <RecentListV2 />
      </div>
    </div>
  )
}
