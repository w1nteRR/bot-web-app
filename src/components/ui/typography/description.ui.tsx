import { ReactNode, FC } from 'react'

export const Description: FC<{ children: ReactNode }> = ({ children }) => {
  return <p className='text-zinc-500 text-sm font-medium'>{children}</p>
}
