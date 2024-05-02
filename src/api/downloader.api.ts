import { IDownloadStoryPayload } from '../types/api/downloader.payload'
import { mainInstance } from './axios.config'

export const DownloaderApi = {
  async downloadStory(payload: IDownloadStoryPayload) {
    return mainInstance.post('/stories-downloader', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
}
