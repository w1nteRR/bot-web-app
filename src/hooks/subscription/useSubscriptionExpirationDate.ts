export const useSubscriptionExpirationDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  return `${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`
}
