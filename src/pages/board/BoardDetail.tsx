import { useState, useEffect } from 'react';
import { usePostActions } from '../../hooks/usePostActions';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostDetail } from '../../apis/board/boardApi';
import type { PostDetailResponse } from '../../apis/board/boardApi';

import Button from '../../components/button/Button';
import Tag from '../../components/tag/Tag';
import SquareCard from '../../components/card/SquareCard';

import GoodIcon from '../../assets/icons/good.svg?react';
import EyeIcon from '../../assets/icons/eye.svg?react';
import ForkIcon from '../../assets/icons/fork.svg?react';

export default function BoardDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [boardData, setBoardData] = useState<PostDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { churaid, toggleChurai, interested, toggleInterested } = usePostActions(Number(id));

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

  // 로딩 인디케이터 가드
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
        
        {/* ① 헤더 영역 */}
        <header className="mb-6 border-b border-gray1 pb-4">
          <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-main bg-opacity-10 text-main mb-2">
            {boardData.category === 'MEAL' ? '식사 레시피' : '디저트'}
          </span>
          <h1 className="text-2xl font-bold text-black mb-3">{boardData.title}</h1>
          
          <div className="flex justify-between items-center text-sm text-gray3">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray4">{boardData.nickname}</span>
              <span className="text-gray2">|</span>
              {/* 백엔드가 포맷팅해 준 생성 날짜 데이터 동적 반영 */}
              <span>{boardData.createdAt ? boardData.createdAt.substring(0, 10) : '2026.05.17'}</span> 
            </div>
            
            {/* 🌟 명세서상의 진짜 변수명인 흥미요(heungMiCount)를 아이콘 쪽에 동적 매칭! */}
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1" title="흥미요 카운트">
                <EyeIcon className="w-4 h-4"/>
                {boardData.interestedCount || 0}
              </span>
              <span className="flex items-center gap-1" title="공유 스택">
                <ForkIcon className="w-4 h-4"/>
                {45}
              </span>
            </div>
          </div>
        </header>

        {/* 📸 레시피 이미지 렌더링 구역 */}
        {boardData.imageUrls && boardData.imageUrls.length > 0 && (
          <section className="mb-6 flex flex-col gap-3">
            {boardData.imageUrls.map((url, index) => (
              <div key={index} className="w-full max-h-[400px] rounded-2xl overflow-hidden border border-gray1 bg-slate-50">
                <img src={url} alt={`레시피 이미지 ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </section>
        )}

        {/* ② 레시피 본문 내용 */}
        <article className="flex-1 text-base text-gray4 leading-relaxed whitespace-pre-wrap py-2">
          {boardData.contents}
        </article>

        {/* ③ 해시태그 목록 */}
        {boardData.tags && boardData.tags.length > 0 && (
          <section className="mt-8 flex flex-wrap gap-2">
            {boardData.tags.map(tag => (
              <Tag key={tag} variant="default">
                {tag}
              </Tag>
            ))}
          </section>
        )}

        {/* ④ 하단 컨트롤 버튼 군 */}
        <section className="mt-12 pt-6 border-t border-gray1 flex flex-col items-center gap-6">
          
          <div className="flex gap-4">
            <Button
              variant={interested ? "primary" : "secondary"}
              isActive={true}
              className="w-36 shadow-sm transition-all"
              onClick={toggleInterested}
            >
              <GoodIcon className={`w-5 h-5 ${interested ? 'text-white' : 'text-main'}`} />
              <span>인정해요 {(boardData.interestedCount ?? 0) + (interested ? 1 : 0)}</span>
            </Button>

            <Button
              variant={churaid ? "primary" : "secondary"}
              isActive={true}
              className="w-36 shadow-sm transition-all"
              onClick={toggleChurai}
            >
              <ForkIcon className={`w-5 h-5 ${churaid ? 'text-white' : 'text-main'}`} />
              <span>츄라이 {(boardData.churaiCount ?? 0) + (churaid ? 1 : 0)}</span>
            </Button>
          </div>

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

        {/* ⑤ 다른 추천 레시피 구역 */}
        <footer className="mt-16 pt-8 border-t border-gray1">
          <h2 className="text-lg font-bold text-black mb-6">👑 다른 Pioneer들의 추천 레시피</h2>
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-start">
            <SquareCard
              postId={1}
              rank={1}
              title="매콤달콤 특제 떡볶이"
              likes={124}
              views={1420}
              shares={45}
              onClick={() => navigate('/boardDetail/1')}
            />
            <SquareCard
              postId={2}
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