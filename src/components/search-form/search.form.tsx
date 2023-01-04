import { useState, ChangeEvent, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdCancel } from 'react-icons/md'

import { Input } from '../ui/input/input.ui'
import { Margin } from '../ui/spacing/margin.ui'
import { Title } from '../ui/typography/title.ui'

import { useId } from '../../hooks/queries/useId'
import { useTelegram } from '../../hooks/telegram/useTelegram'

export const SearchForm = () => {
  const [searchValue, setSearchValue] = useState('')

  const tg = useTelegram()
  const navigate = useNavigate()
  // const { isLoading, data, refetch } = useId(searchValue)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const searchRequest = useCallback(() => {
    console.log('SEARCH', searchValue)

    navigate(`/user/${searchValue}`)
  }, [searchValue])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', searchRequest)

    return () => {
      tg.offEvent('mainButtonClicked', searchRequest)
      // tg.MainButton.hide()
    }
  }, [searchRequest, tg])

  useEffect(() => {
    if (searchValue.length >= 3) {
      tg.MainButton.setText('Search')
      tg.MainButton.show()
    } else {
      tg.MainButton.hide()
    }
  }, [searchValue.length])

  document.onclick = () => {
    console.log('click doc')
    if (document.activeElement instanceof HTMLElement) {
      document.body.blur()
    }
  }

  const resetSearchForm = () => {
    setSearchValue('')
  }

  return (
    <>
      <form className='w-full mr-5 relative'>
        {/* <label htmlFor='search'>Name</label> */}
        <div className='p-2 absolute right-0 h-full flex items-center'>
          {searchValue.length >= 1 && (
            <MdCancel size={20} color='gray' onClick={resetSearchForm} />
          )}
        </div>
        <Input
          style={{
            fontSize: 16,
            backgroundColor: tg.themeParams.secondary_bg_color,
          }}
          placeholder='Search'
          value={searchValue}
          onChange={handleInputChange}
          type='text'
          name='search'
        />
      </form>
    </>
  )
}
