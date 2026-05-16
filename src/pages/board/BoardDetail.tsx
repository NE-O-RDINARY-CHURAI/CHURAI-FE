import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostDetail, type PostDetailResponse } from '../../apis/board/boardApi';

import Button from '../../components/button/Button';
import Tag from '../../components/tag/Tag';
import SquareCard from '../../components/card/SquareCard';

import GoodIcon from '../../assets/icons/GoodIcon';
import EyeIcon from '../../assets/icons/EyeIcon';
import ForkIcon from '../../assets/icons/ForkIcon';

export default function BoardDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState<PostDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(124); 
  useEffect(() => {
    if (!id) return;

    const fetchPostDetail = async () => {
      try {
        setIsLoading(true);
        const data = await getPostDetail(id);
        setBoardData(data);
      } catch (error) {
        console.error('게시글 상세 조회 실패:', error);
        alert('존재하지 않거나 삭제된 레시피 게시글입니다.');
        navigate('/board'); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetail();
  }, [id, navigate]);

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray3 body1-medium">
        레시피 데이터를 맛있게 불러오는 중... ⏳
      </div>
    );
  }

  if (!boardData) return null;

  return (
    <div className="min-h-screen bg-white px-4 py-10 flex justify-center">
      <div className="w-full max-w-[600px] flex flex-col">
        <header className="mb-6 border-b border-gray1 pb-4">
          <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-main bg-opacity-10 text-main mb-2">
            {boardData.category === 'MEAL' ? '식사 레시피' : '디저트'}
          </span>
          <h1 className="text-2xl font-bold text-black mb-3">{boardData.title}</h1>
          
          <div className="flex justify-between items-center text-sm text-gray3">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray4">{boardData.nickname}</span>
              <span className="text-gray2">|</span>
              <span>2026.05.17</span> 
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1">
                <EyeIcon className="w-4 h-4"/>
                {boardData.views}
              </span>
              <span className="flex items-center gap-1">
                <ForkIcon className="w-4 h-4"/>
                {45} 
              </span>
            </div>
          </div>
        </header>

        {boardData.imageUrls && boardData.imageUrls.length > 0 && (
          <section className="mb-6 flex flex-col gap-3">
            {boardData.imageUrls.map((url, index) => (
              <div key={index} className="w-full max-h-[400px] rounded-2xl overflow-hidden border border-gray1 bg-slate-50">
                <img src={url} alt={`레시피 스텝 ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </section>
        )}

        <article className="flex-1 text-base text-gray4 leading-relaxed whitespace-pre-wrap py-2">
          {boardData.contents}
        </article>

        {boardData.tags && boardData.tags.length > 0 && (
          <section className="mt-8 flex flex-wrap gap-2">
            {boardData.tags.map(tag => (
              <Tag key={tag} variant="default">
                {tag}
              </Tag>
            ))}
          </section>
        )}

        <section className="mt-12 pt-6 border-t border-gray1 flex flex-col items-center gap-6">
          <Button 
            variant={isLiked ? "primary" : "secondary"} 
            isActive={true} 
            className="w-48 shadow-sm transition-all"
            onClick={handleLikeToggle}
          >
            <GoodIcon className={`w-5 h-5 ${isLiked ? 'text-white' : 'text-main'}`} />
            <span>인정해요 {likeCount}</span>
          </Button>

          <div className="w-full flex gap-3 mt-2">
            <Button 
              variant="tertiary" 
              className="flex-1"
              onClick={() => navigate('/board')}
            >
              목록으로 돌아가기
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1"
              onClick={() => navigate(`/boardEdit/${id}`)}
            >
              수정하기
            </Button>
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-gray1">
          <h2 className="text-lg font-bold text-black mb-6">👑 다른 Pioneer들의 추천 레시피</h2>
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-start">
            <SquareCard
              rank={1}
              title="매콤달콤 특제 떡볶이"
              likes={124}
              views={1420}
              shares={45}
              onClick={() => navigate('/boardDetail/1')}
            />
            <SquareCard
              rank={2}
              title="초코 가득 퐁당 쇼콜라"
              likes={98}
              views={890}
              shares={22}
              onClick={() => navigate('/boardDetail/2')}
            />
          </div>
        </footer>

      </div>
    </div>
  );
}