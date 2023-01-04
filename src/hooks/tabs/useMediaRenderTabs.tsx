import { useCallback, useState } from 'react'

import { Highlights } from '../../components/highlights/hightlights'
import { StoriesV2 } from '../../components/stories/stories-v2'
import { Alert } from '../../components/ui/alert/alert.ui'

import { useUserContext } from '../context/useUserContext'
import { useTelegram } from '../telegram/useTelegram'

enum Tabs {
  'Stories' = 0,
  'Highlights' = 1,
  'Posts' = 2,
}

export const useMediaRenderTabs = () => {
  const [activeTab, setActiveTab] = useState(0)

  const { user } = useUserContext()
  const { themeParams } = useTelegram()

  const toggleTab = (index: number) => () => setActiveTab(index)

  const renderTabContent = useCallback(() => {
    if (!user) return

    const { pk_id, has_highlight_reels, username } = user

    if (activeTab === Tabs.Stories) return <StoriesV2 id={String(pk_id)} />

    if (activeTab === Tabs.Highlights && has_highlight_reels)
      return <Highlights userId={String(user.pk_id)} />

    if (activeTab === Tabs.Highlights && !has_highlight_reels)
      return (
        <Alert>
          <p className='text-xs' style={{ color: themeParams.hint_color }}>
            😔 <span className='font-semibold'>{username}</span> has no
            highlights
          </p>
        </Alert>
      )

    if (activeTab === Tabs.Posts)
      return (
        <Alert>
          <p className='text-xs' style={{ color: themeParams.hint_color }}>
            😔 <span className='font-semibold'>{username}</span> has no posts
          </p>
        </Alert>
      )
  }, [user, activeTab])

  return {
    renderTabContent,
    toggleTab,
    activeTab,
  }
}
