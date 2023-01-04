import { FC } from 'react'

import { Chip } from '../ui/chip/chip.ui'

import { useUserContext } from '../../hooks/context/useUserContext'
import { useMediaRenderTabs } from '../../hooks/tabs/useMediaRenderTabs'

const tabs = ['Stories', 'Highlights', 'Posts']

export const Tabs: FC = () => {
  const { user } = useUserContext()

  const { renderTabContent, activeTab, toggleTab } = useMediaRenderTabs()

  if (!user) return null

  return (
    <>
      <div className='flex flex-row mt-5 mx-3'>
        {tabs.map((item, index) => {
          const isActive = activeTab === index

          const textColor = isActive ? 'text-gray-200' : 'text-gray-400'
          const textSize = isActive ? 'text-sm' : 'text-xs'

          return (
            <Chip key={item} isActive={isActive} onClick={toggleTab(index)}>
              <p className={`${textSize} ${textColor}`}>{item}</p>
            </Chip>
          )
        })}
      </div>
      {renderTabContent()}
    </>
  )
}
