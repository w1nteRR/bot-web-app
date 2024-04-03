import { FC } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import {
  IoNotificationsCircleSharp,
  IoChevronForwardOutline,
} from 'react-icons/io5'
import { CgSpinnerTwoAlt } from 'react-icons/cg'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { Pages } from '../../types/navigation/navigation.types'
import { NotificationsApi } from '../../api/notifications.api'

export const Tracking: FC = () => {
  const { themeParams, initDataUnsafe } = useTelegram()
  const navigate = useNavigate()

  // const { isLoading, data } = useQuery(
  //   ['notifications'],
  //   () => NotificationsApi.getNotifications(initDataUnsafe.user?.id!),
  //   {
  //     staleTime: Infinity,
  //   },
  // )

  const handleButtonClick = () => {
    // if (data?.data.length) {
    // navigate(Pages.NotificationsCreate)
    //
    //   return
    // }

    navigate(Pages.NotificationsSettings)
  }

  return (
    <div
      className='mx-3 mt-6 rounded-t-xl'
      style={{ backgroundColor: themeParams.section_bg_color }}
    >
      <button
        className='p-4 rounded-xl  w-full h-full flex items-center gap-2'
        onClick={handleButtonClick}
        // disabled={isLoading}
      >
        <IoNotificationsCircleSharp size={30} color={themeParams.link_color} />

        <span className='font-medium' style={{ color: themeParams.text_color }}>
          Notifications
        </span>

        {/*{isLoading ? (*/}
        {/*  <CgSpinnerTwoAlt*/}
        {/*    className='animate-spin justify-self-end ml-auto'*/}
        {/*    color={themeParams.link_color}*/}
        {/*    size={18}*/}
        {/*  />*/}
        {/*) : (*/}
        {/*  <IoChevronForwardOutline*/}
        {/*    className='justify-self-end ml-auto'*/}
        {/*    color={themeParams.hint_color}*/}
        {/*  />*/}
        {/*)}*/}
      </button>
    </div>
  )
}
