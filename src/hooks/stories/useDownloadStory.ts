import { useCallback } from 'react'
import { useMutation } from 'react-query'

import { useWebAppUserContext } from '../context/useWebAppUserContext'
import { DownloaderApi } from '../../api/downloader.api'
import { IStory } from '../../types/stories/stories.types'

export const useDownloadStory = () => {
  const { user } = useWebAppUserContext()
  const mutation = useMutation(DownloaderApi.downloadStory)

  const download = useCallback(async (story: IStory) => {
    const { is_video, id } = story

    await mutation.mutateAsync({
      account_id: user?.id!,
      story_id: id,
      is_video,
    })
  }, [])

  return {
    download,
    mutation,
  }
}
