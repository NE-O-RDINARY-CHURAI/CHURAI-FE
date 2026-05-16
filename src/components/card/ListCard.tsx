import { useState } from 'react'
import badge1 from '../../assets/icons/1st-badge.svg'
import badge2 from '../../assets/icons/2nd-badge.svg'
import badge3 from '../../assets/icons/3rd-badge.svg'
import chuRaiIcon from '../../assets/icons/card-comment.svg'
import heungMiIcon from '../../assets/icons/card-like.svg'

interface PostCardProps {
  imageUrl?: string
  category: string
  nickname: string
  title: string
  chuRaiCount?: number
  heungMiCount?: number
  rank?: number
  onClick?: () => void
}

const BADGE: Record<number, string> = { 1: badge1, 2: badge2, 3: badge3 }

const PostCard = ({
  imageUrl,
  category,
  nickname,
  title,
  chuRaiCount = 0,
  heungMiCount = 0,
  rank,
  onClick,
}: PostCardProps) => {
  const [pressed, setPressed] = useState(false)

  const handleClick = () => {
    if (!onClick) return
    setPressed(true)
    setTimeout(() => {
      setPressed(false)
      onClick()
    }, 150)
  }

  return (
    <article
      className={`flex h-[94px] w-full items-center gap-3 rounded-medium4 bg-white p-3 transition-all duration-150 ${
        pressed ? 'scale-[0.99] border border-gray2 shadow-none' : 'border border-transparent hover:shadow-sm'
      }`}
      onClick={handleClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="relative h-[70px] w-[70px] shrink-0">
        <div className="h-full w-full overflow-hidden rounded-small1 bg-gray1">
          {imageUrl && <img src={imageUrl} alt={title} className="h-full w-full object-cover" />}
        </div>
        {rank && BADGE[rank] && (
          <img src={BADGE[rank]} alt={`${rank}등`} className="absolute -left-2 -top-2" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center gap-1">
          <span className="caption2-medium text-gray4">{category}</span>
          <span className="caption2-medium text-gray4">|</span>
          <span className="caption2-medium max-w-[42px] truncate text-gray2">{nickname}</span>
        </div>

        <h3 className="caption1-semibold line-clamp-1 text-black">{title}</h3>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <img src={chuRaiIcon} alt="츄라이" className="h-[18px] w-[18px]" />
            <span className="caption1-semibold text-main">{chuRaiCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={heungMiIcon} alt="흥미" className="h-[18px] w-[18px]" />
            <span className="caption1-semibold text-gray2">{heungMiCount}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostCard
