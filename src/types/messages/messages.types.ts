export enum Commands {
  RESET_FAVORITES = 'RESET_FAVORITES',
}

export interface IMessage {
  command: Commands
  status: string
  user_id: number
}
