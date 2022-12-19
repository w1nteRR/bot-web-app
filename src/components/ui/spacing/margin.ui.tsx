import { FC, ReactNode } from 'react'

export const Margin: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className='my-16'>{children}</div>
}
