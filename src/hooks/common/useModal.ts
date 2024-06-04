import { useCallback, useState } from 'react'

export const useModal = () => {
  const [open, setOpen] = useState(false)

  const handleModalClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleModalOpen = useCallback(() => {
    setOpen(true)
  }, [])

  return {
    open,
    handleModalClose,
    handleModalOpen,
  }
}
