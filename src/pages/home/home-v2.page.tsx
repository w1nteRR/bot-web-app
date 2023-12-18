import { FC } from 'react'

import { Header } from '../../components/header/header'
import { RecentListV3 } from '../../components/recent-list/recent-list.v3'
import { RecentListV4 } from '../../components/recent-list/recent-list.v4'
import { useTranslation } from 'react-i18next'

export const HomeV2Page: FC = () => {
  const { t, i18n } = useTranslation()
  return (
    <>
      <Header />
      <RecentListV3 />
      <RecentListV4 />
      <button onClick={() => i18n.changeLanguage('uk')}>Укр</button>
      <button onClick={() => i18n.changeLanguage('ru')}>Рус</button>
      <button onClick={() => i18n.changeLanguage('en')}>Eng</button>
    </>
  )
}
