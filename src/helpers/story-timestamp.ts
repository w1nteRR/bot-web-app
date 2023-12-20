export const convertUnixTimestamp = (unixTime: number) => {
  const timestamp = unixTime * 1000

  const date = new Date(timestamp)

  const gmtDate = date.toUTCString()

  const localDate = date.toLocaleString()

  const now = new Date()
  const timeDifference = now.getTime() - date.getTime()

  const relativeTime =
    timeDifference > 0 && `${Math.floor(timeDifference / 3600000)} hours ago`

  return relativeTime
}
