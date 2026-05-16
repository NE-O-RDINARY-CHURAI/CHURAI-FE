import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 🌟 TypeScript 컴파일 오류 방지를 위해 'type' 키워드를 명시하여 안전하게 가져옵니다!
import { getPostDetail } from '../../apis/board/boardApi';
import type { PostDetailResponse } from '../../apis/board/boardApi';

import Button from '../../components/button/Button';
import Tag from '../../components/tag/Tag';
import SquareCard from '../../components/card/SquareCard';

import GoodIcon from '../../assets/icons/GoodIcon';
import EyeIcon from '../../assets/icons/EyeIcon';
import ForkIcon from '../../assets/icons/ForkIcon';

export default function BoardDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // 상태 관리 세팅
  const [boardData, setBoardData] = useState<PostDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  
  // 백엔드가 주는 진짜 '흥미요/츄라이' 카운트가 연동되기 전까지 바인딩할 클라이언트 상태
  const [likeCount, setLikeCount] = useState(0); 

  // 컴포넌트 렌더링 시 실시간 데이터 호출
  useEffect(() => {
    if (!id) return;

    const fetchPostDetail = async () => {
      try {
        setIsLoading(true);
        const data = await getPostDetail(id);
        setBoardData(data);
        // 백엔드에서 내려주는 진짜 chuRaiCount(또는 heungMiCount)를 초기 좋아요 수로 세팅
        setLikeCount(data.chuRaiCount || 0); 
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

  // '인정해요' 버튼 클릭 핸들러
  const handleLikeToggle = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

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
                {boardData.heungMiCount || 0}
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
          
          {/* 인정해요 (츄라이 카운트 연동 파트) */}
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

        {/* ⑤ 다른 추천 레시피 구역 */}
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