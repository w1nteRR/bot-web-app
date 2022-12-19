import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { SearchForm } from '../../components/search-form/search.form'

import { useBackButton } from '../../hooks/telegram/useBackButton'

export const SearchPage: FC = () => {
  const navigate = useNavigate()
  useBackButton(() => navigate(-1))

  return (
    <>
      <SearchForm />
    </>
  )
}
