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
      className="rounded-medium4 flex h-23.5 w-full cursor-pointer items-center gap-3 bg-white p-3"
      onClick={onClick}
    >
      <div className="rounded-small1 bg-gray1 h-17.5 w-17.5 shrink-0 overflow-hidden">
        {imageUrl && <img src={imageUrl} alt={title} className="h-full w-full object-cover" />}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center gap-1">
          <span className="caption2-medium text-gray4 max-w-7.75 truncate">{category}</span>
          <span className="caption2-medium text-gray4">|</span>
          <span className="caption2-medium text-gray2 max-w-10.5 truncate">{nickname}</span>
        </div>

        <h3 className="caption1-semibold line-clamp-1 text-black">{title}</h3>

        <div className="flex items-center gap-2">
          <div className="text-main flex items-center gap-1">
            <img src={commentIcon} alt="" className="h-[4.5 w-4.5" />
            <span className="caption1-semibold">{commentCount}</span>
          </div>

          <div className="text-gray2 flex items-center gap-1">
            <img src={likeIcon} alt="" className="h-4.5 w-4.5" />
            <span className="caption1-semibold">{likeCount}</span>
          </div>

          <div className="text-gray2 flex items-center gap-1">
            <img src={lookIcon} alt="" className="h-4.5 w-4.5" />
            <span className="caption1-semibold">{viewCount}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostCard
