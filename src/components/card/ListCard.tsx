import commentIcon from '../../assets/icons/card-comment.svg'
import likeIcon from '../../assets/icons/card-like.svg'
import lookIcon from '../../assets/icons/card-look.svg'

interface PostCardProps {
  imageUrl?: string
  category: string
  nickname: string
  title: string
  commentCount: number
  likeCount: number
  viewCount: number
  onClick?: () => void
}

const PostCard = ({
  imageUrl,
  category,
  nickname,
  title,
  commentCount,
  likeCount,
  viewCount,
  onClick,
}: PostCardProps) => {
  return (
    <article
      className="flex h-[94px] w-full items-center gap-3 rounded-medium4 bg-white p-3"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="h-[70px] w-[70px] shrink-0 overflow-hidden rounded-small1 bg-gray1">
        {imageUrl && <img src={imageUrl} alt={title} className="h-full w-full object-cover" />}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center gap-1">
          <span className="caption2-medium max-w-[31px] truncate text-gray4">{category}</span>
          <span className="caption2-medium text-gray4">|</span>
          <span className="caption2-medium max-w-[42px] truncate text-gray2">{nickname}</span>
        </div>

        <h3 className="caption1-semibold line-clamp-1 text-black">{title}</h3>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-main">
            <img src={commentIcon} alt="" className="h-[18px] w-[18px]" />
            <span className="caption1-semibold">{commentCount}</span>
          </div>

          <div className="flex items-center gap-1 text-gray2">
            <img src={likeIcon} alt="" className="h-[18px] w-[18px]" />
            <span className="caption1-semibold">{likeCount}</span>
          </div>

          <div className="flex items-center gap-1 text-gray2">
            <img src={lookIcon} alt="" className="h-[18px] w-[18px]" />
            <span className="caption1-semibold">{viewCount}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostCard
