import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineCloudDownload } from 'react-icons/ai'

import { Margin } from '../../components/ui/spacing/margin.ui'
import { Title } from '../../components/ui/typography/title.ui'
import { Description } from '../../components/ui/typography/description.ui'

import { MediaRender } from '../../components/shared/media-render/media-render.shared'

import { useBackButton } from '../../hooks/telegram/useBackButton'

const DATA = [
  {
    id: 1,
    source:
      'https://mygluten-freekitchen.com/wp-content/uploads/2020/03/Gluten-free-Chicken-Stir-Fry-480x480.jpg.webp',
    date: '12 Jun 2019',
  },
  {
    id: 2,
    source:
      'https://mygluten-freekitchen.com/wp-content/uploads/2020/03/Gluten-free-Chicken-Stir-Fry-480x480.jpg.webp',
    date: '13 Jun 2019',
  },
  {
    id: 3,
    source:
      'https://www.thenomadicfitzpatricks.com/wp-content/uploads/2021/03/IMG_5864-480x480.jpg',
    date: '23 Jun 2019',
  },
  {
    id: 4,
    source: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4#t=0.1',
    date: '25 Jun 2019',
    isVideo: true,
  },
]

export const HighlightPage: FC = () => {
  const navigate = useNavigate()

  useBackButton(() => navigate(-1))

  return (
    <Margin>
      <Title>Life 1</Title>

      <Margin>
        {DATA.map((highlight) => (
          <div key={highlight.id}>
            <div
              style={{ height: 440 }}
              className='my-5 bg-zinc-800 rounded-xl'
            >
              {/* <MediaRender
                isVideo={highlight.isVideo!}
                source={highlight.source}
              /> */}
            </div>
            <div className='flex justify-between items-center mt-4 px-2'>
              <Description>{highlight.date}</Description>
              <AiOutlineCloudDownload className='text-blue-600' size={30} />
            </div>
          </div>
        ))}
      </Margin>
    </Margin>
  )
}
