import BadgeFirst from '../../assets/icons/1st-badge.svg';
import BadgeSecond from '../../assets/icons/2nd-badge.svg';
import BadgeThird from '../../assets/icons/3rd-badge.svg';
import GoodIcon from '../../assets/icons/GoodIcon';
import EyeIcon from '../../assets/icons/EyeIcon';
import ForkIcon from '../../assets/icons/ForkIcon';

interface SquareCardProps {
  rank?: number;
  imageSrc?: string;
  title: string;
  likes: number;
  views: number;
  shares: number;
  onClick?: () => void;
}

export default function SquareCard({
  rank,
  imageSrc,
  title,
  likes,
  views,
  shares,
  onClick,
}: SquareCardProps) {
  
  const rankBadges: Record<number, string> = {
    1: BadgeFirst,
    2: BadgeSecond,
    3: BadgeThird,
  };

  return (
    <div
      onClick={onClick}
      className="relative flex flex-col w-[240px] h-[244px] bg-white border border-gray2 rounded-2xl overflow-visible cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
    >
      {rank && rankBadges[rank] && (
        <img
          src={rankBadges[rank]}
          alt={`${rank}등 뱃지`}
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-[42px] h-[37px] object-contain drop-shadow-sm pointer-events-none" 
        />
      )}

      <div className="w-full h-[146px] bg-gray1 rounded-t-2xl overflow-hidden flex-shrink-0">
        {imageSrc ? (
          <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[linear-gradient(45deg,#f4f5f6_25%,transparent_25%),linear-gradient(-45deg,#f4f5f6_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f4f5f6_75%),linear-gradient(-45deg,transparent_75%,#f4f5f6_75%)] bg-[size:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0]" />
        )}
      </div>

      <div className="flex flex-col justify-between flex-1 pt-3.5 pb-4 px-4 bg-white rounded-b-2xl overflow-hidden">
        
        <h3 className="body2-medium text-black truncate" title={title}>
          {title}
        </h3>

        <div className="flex items-center gap-2.5 caption1-regular text-gray3">
          
          <div className="flex items-center gap-1 text-main font-medium">
            <GoodIcon className="w-4 h-4" />
            <span>{likes}</span>
          </div>

          <div className="flex items-center gap-1 transition-colors duration-200 hover:text-main cursor-pointer">
            <EyeIcon className="w-4 h-4" />
            <span>{views}</span>
          </div>

          <div className="flex items-center gap-1 transition-colors duration-200 hover:text-main cursor-pointer">
            <ForkIcon className="w-4 h-4" />
            <span>{shares}</span>
          </div>

        </div>
      </div>
    </div>
  );
}