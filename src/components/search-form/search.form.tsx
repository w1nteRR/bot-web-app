import { useState, ChangeEvent, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { MdCancel } from 'react-icons/md'

import { Input } from '../ui/input/input.ui'

import { useTelegram } from '../../hooks/telegram/useTelegram'

export const SearchForm = () => {
  const [searchValue, setSearchValue] = useState('')

  const { t } = useTranslation()
  const tg = useTelegram()
  const navigate = useNavigate()
  const location = useLocation()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const searchRequest = useCallback(() => {
    navigate(`/user/${searchValue}`, {
      state: { from: location.pathname, isFromSearch: true },
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      tg.MainButton.setText(t('home.search'))
      tg.MainButton.show()
    } else {
      tg.MainButton.hide()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue.length])

  useEffect(() => {
    return () => {
      tg.MainButton.hide()
    }
  }, [])

  document.onclick = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.body.blur()
    }
  }

  const resetSearchForm = () => {
    setSearchValue('')
  }

  return (
    <>
      <form className='w-full relative mb-2'>
        <div className='p-2 absolute right-0 h-full flex items-center'>
          {searchValue.length >= 1 && (
            <MdCancel size={20} color='gray' onClick={resetSearchForm} />
          )}
        </div>
        <Input
          style={{
            fontSize: 16,
            backgroundColor: tg.themeParams.section_bg_color,
          }}
          placeholder={t('home.search')}
          value={searchValue}
          onChange={handleInputChange}
          type='text'
          name='search'
          autoComplete='off'
          autoCorrect='off'
          autoCapitalize='off'
        />
      </form>
    </>
  )
}
