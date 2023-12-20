import { memo } from 'react'

import { SearchForm } from '../search-form/search.form'

export const Header = memo(() => {
  return (
    <header className='flex justify-between items-center p-5'>
      <SearchForm />
    </header>
  )
})
