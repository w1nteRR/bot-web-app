import { useEffect } from 'react'

import { SearchForm } from '../search-form/search.form'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useProfile } from '../../hooks/queries/useProfile'

export const Header = () => {
  const { themeParams, initDataUnsafe } = useTelegram()

  const { mutateAsync, isLoading, data } = useProfile()

  useEffect(() => {
    ;(async () => {
      const { query_id, user } = initDataUnsafe

      if (!query_id || !user?.id) return

      await mutateAsync({ queryId: query_id, userId: user?.id })
    })()
  }, [mutateAsync, initDataUnsafe])

  return (
    <>
      <header
        className='flex justify-between items-center p-5'
        style={{ backgroundColor: themeParams.bg_color }}
      >
        <SearchForm />
        {isLoading ? (
          <div
            role='status'
            className='space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center'
          >
            <div className='flex justify-center items-center w-10 h-10 bg-gray-300 rounded-full'></div>
          </div>
        ) : (
          <img
            className='rounded-full'
            style={{
              width: 40,
              height: 40,
            }}
            src={data?.profile_picture}
            alt=''
          />
        )}
      </header>
    </>
  )
}
