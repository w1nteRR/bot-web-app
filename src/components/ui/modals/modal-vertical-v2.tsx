import { FC, PropsWithChildren, ReactNode, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTelegram } from '../../../hooks/telegram/useTelegram'

interface IModalVerticalV2Props extends PropsWithChildren {
  open: boolean
  onClose: () => void
  header?: ReactNode
}
export const ModalVerticalV2: FC<IModalVerticalV2Props> = ({
  open,
  header,
  children,
  onClose,
}) => {
  const { themeParams } = useTelegram()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <div className='fixed z-10 h-screen inset-0 pt-4'>
          <motion.div
            style={{ backgroundColor: themeParams.section_bg_color }}
            className='w-full h-full rounded-t-xl overflow-y-scroll no-scrollbar'
            initial={{ y: '100%' }}
            animate={{
              y: 0,
              transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
            }}
            exit={{
              y: '100%',
              transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
            }}
          >
            <div className='p-5 flex justify-between'>
              <div>{header}</div>

              <button onClick={onClose}>
                <span style={{ color: themeParams.link_color }}>Close</span>
              </button>
            </div>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
