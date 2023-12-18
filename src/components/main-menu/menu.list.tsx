import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRegHeart } from 'react-icons/fa'
import { HiSearch } from 'react-icons/hi'

import { ROUTE } from '../../types/routes.enum'
import { useTranslation } from 'react-i18next'

export const MenuList: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className='border-solid my-10 h-48 grid grid-cols-2 gap-5 grid-flow-col'>
      <button className='row-span-2 bg-slate-700 rounded-3xl'>?</button>
      <button
        className='col-span-2 bg-indigo-200 rounded-3xl px-5 flex justify-between items-center'
        onClick={() => navigate(ROUTE.SEARCH)}
      >
        <div
          className='flex items-center justify-center rounded-full bg-indigo-300'
          style={{ height: 40, width: 40 }}
        >
          <HiSearch size={18} />
        </div>{' '}
        {t('home.search')}
      </button>
      <button
        className='row-span-1 col-span-2 bg-red-200 px-5 rounded-3xl flex justify-between items-center'
        onClick={() => navigate(ROUTE.FAVORITES)}
      >
        <div
          className='flex items-center justify-center rounded-full bg-red-300'
          style={{ height: 40, width: 40 }}
        >
          <FaRegHeart size={18} />
        </div>
        {t('home.favorites')}
      </button>
    </div>
  )
}
