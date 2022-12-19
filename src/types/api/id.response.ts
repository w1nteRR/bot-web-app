import { Id } from '../common'

export interface IIdResponse {
  message?: 'Page not found'
  id?: Id
  unrelated_data: {
    time_gen: 0
  }
}
