import { FC, forwardRef, PropsWithChildren, ReactNode, Ref } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { ModalRef } from '../../../types/common'
import { useTelegram } from '../../../hooks/telegram/useTelegram'

interface IModalProps extends PropsWithChildren {
  open: boolean
  onClose: () => void
  header?: ReactNode
}

export const ModalVertical: FC<IModalProps> = forwardRef(
  (props, ref: Ref<ModalRef>) => {
    const { open, onClose, children, header } = props

    const { themeParams, HapticFeedback } = useTelegram()

    const handleClose = () => {
      HapticFeedback.impactOccurred('light')
      onClose()
    }

    return (
      <AnimatePresence mode={'wait'} initial={false}>
        {open && (
          <motion.div
            key='modal'
            initial={{
              bottom: '-100%',
              position: 'absolute',
            }}
            animate={{ bottom: 0 }}
            exit={{ bottom: '-100%', transition: { delay: 0.1 } }}
            // transition={{ duration: 0.1 }}
            className='h-full w-screen'
            onClick={onClose}
          >
            <div
              className='absolute bottom-0 w-screen h-5/6 rounded-t-xl'
              style={{ backgroundColor: themeParams.section_bg_color }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className='flex justify-between p-3'>
                <div className='overflow-x-scroll'>{header}</div>

                <button
                  onClick={handleClose}
                  style={{ color: themeParams.link_color }}
                  className='p-1'
                >
                  Close
                </button>
              </div>

              <div style={{ backgroundColor: themeParams.section_bg_color }}>
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  },
)
