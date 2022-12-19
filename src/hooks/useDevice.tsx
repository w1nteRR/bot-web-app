export const useDevice = () => {
  const userAgent = navigator.userAgent

  if (/iPad|iPhone|iPod/i.test(userAgent)) {
    return 'ios'
  }
}
