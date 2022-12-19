import { FC, ReactNode } from 'react'

export const Overline: FC<{ children: ReactNode }> = ({ children }) => {
  return <p className='uppercase text-slate-400 text-xs'>{children}</p>
}
