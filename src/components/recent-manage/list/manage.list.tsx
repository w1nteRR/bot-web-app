import { FC } from 'react'

import { RecentManageItem } from './manage.item'

// import {} from '../../../hooks/recent/useRecent'
import { useAddUserToChat } from '../../../hooks/user/useAddUserToChat'

export const RecentManageList: FC = () => {
  // const { recentSearchList, removeUserFromRecent } = useRecent()

  const { addUserToChat } = useAddUserToChat()

  return (
    <>
      {/* {recentSearchList.map(({ pk_id, profile_image, username, full_name }) => (
        <RecentManageItem
          key={pk_id}
          image={profile_image}
          title={username}
          subtitle={full_name}
          onAddToChatClick={() => addUserToChat(username, full_name)}
          onRemoveClick={() => removeUserFromRecent(pk_id)}
        />
      ))} */}
    </>
  )
}
