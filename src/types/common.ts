export type Id = string

export type ModalRef = {
  open: () => void
  close: () => void
  toggle: () => void
  isOpen: boolean
}
