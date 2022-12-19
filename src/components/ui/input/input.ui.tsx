import { FC, InputHTMLAttributes } from 'react'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<IInputProps> = (props) => {
  return (
    <input
      className='py-2 px-3 bg-zinc-800 w-full rounded-xl outline-none text-base text-gray-400'
      {...props}
    />
  )
}
