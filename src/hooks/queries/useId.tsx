import { useQuery } from 'react-query'
import { ScrapperApi } from '../../api/scrapper.api'

export const useId = (username: string) => {
  // const { isLoading, data, refetch } = useQuery(
  //   ['user id', username],
  //   () => ScrapperApi.findIdByUsername(username),
  //   {
  //     enabled: false,
  //     // onSuccess: () => {},
  //   }
  // )
  // return {
  //   isLoading,
  //   data,
  //   refetch,
  // }
}
