import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getPostDetail } from '../../apis/board/boardApi';
import type { PostDetailResponse } from '../../apis/board/boardApi';

import BowlIcon from '../../assets/icons/boul.svg';
import SnackIcon from '../../assets/icons/snacks.svg';

export default function BoardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [boardData, setBoardData] = useState<PostDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isChuRai, setIsChuRai] = useState(false);
  const [isHeungMi, setIsHeungMi] = useState(false);
  
  const [chuRaiCount, setChuRaiCount] = useState(0);
  const [heungMiCount, setHeungMiCount] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchPostDetail = async () => {
      try {
        setIsLoading(true);
        const data = await getPostDetail(id);
        setBoardData(data);
        setChuRaiCount(data.chuRaiCount || 0);
        setHeungMiCount(data.heungMiCount || 0);
      } catch (error) {
        console.error('API 에러, 임시 테스트 모드로 진입합니다:', error);
        
        setBoardData({
          category: 'DESSERT',
          title: '레시피이름름름름름름름름름름름름름름름름름...',
          nickname: '작성자명',
          contents: '조리법 상세 내용 공간입니다. 피그마 시안처럼 정갈한 레이아웃을 구현하기 위해 디폴트 텍스트가 노출됩니다.',
          imageUrls: ['', '', ''],
          tags: ['달달구리', '간식'],
          heungMiCount: 12,
          chuRaiCount: 34,
          createdAt: '2026.05.17'
        });
        setChuRaiCount(34);
        setHeungMiCount(12);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  const handleBackNavigation = () => {
    if (window.confirm('정말 뒤로 가시겠습니까?')) {
      navigate('/board');
    }
  };

  const handleChuRaiToggle = () => {
    if (isChuRai) {
      setChuRaiCount(prev => prev - 1);
    } else {
      setChuRaiCount(prev => prev + 1);
    }
    setIsChuRai(!isChuRai);
  };

  const handleHeungMiToggle = () => {
    if (isHeungMi) {
      setHeungMiCount(prev => prev - 1);
    } else {
      setHeungMiCount(prev => prev + 1);
    }
    setIsHeungMi(!isHeungMi);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-xs font-semibold text-gray-400">
        레시피를 맛있게 불러오는 중... ⏳
      </div>
    );
  }

  if (!boardData) return null;

  return (
    <div className="min-h-screen bg-slate-100 py-10 flex justify-center items-start">
      
      <div className="w-[360px] bg-white shadow-md overflow-hidden flex flex-col rounded-2xl pb-10">
        
        <header className="w-full h-12 bg-gray-400 px-4 flex items-center select-none relative">
          <button 
            type="button" 
            onClick={handleBackNavigation}
            className="text-white hover:opacity-80 transition-opacity flex items-center justify-center"
            aria-label="뒤로가기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </header>

        <section className="w-full h-[200px] bg-gray-50 flex gap-1 overflow-x-auto scrollbar-none p-1">
          {boardData.imageUrls && boardData.imageUrls.length > 0 ? (
            boardData.imageUrls.map((url, index) => (
              <div key={index} className="w-[180px] h-full bg-slate-200 flex-shrink-0 relative overflow-hidden">
                {url ? (
                  <img src={url} alt={`레시피 ${index}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-neutral-200 opacity-60 flex items-center justify-center text-[10px] text-gray-400 font-medium">
                    Image Box {index + 1}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-xs text-gray-300">
              등록된 사진이 없습니다.
            </div>
          )}
        </section>

        <div className="px-6 pt-5 flex flex-col">
          
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-1.5">
            <span>{boardData.category === 'MEAL' ? '식사' : '디저트'}</span>
            <span>|</span>
            <span>{boardData.nickname}</span>
          </div>

          <h2 className="text-base font-black text-black leading-snug mb-2.5 break-all line-clamp-1">
            {boardData.title}
          </h2>

          <div className="flex items-center gap-3 text-[11px] font-bold text-gray-300 mb-5">
            <span className="flex items-center gap-1 text-[#FD4A12]">
              🍴 <span className="text-[#000000]">{chuRaiCount}</span>
            </span>
            <span className="flex items-center gap-1">
              👍 <span className="text-[#000000]">{heungMiCount}</span>
            </span>
            <span className="flex items-center gap-1">
              👁️ <span className="text-[#000000]">142</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-2">
            
            <button
              type="button"
              onClick={handleChuRaiToggle}
              className={`h-10 rounded-xl border text-xs font-black flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] ${
                isChuRai
                  ? 'border-[#FD4A12] bg-[#FD4A12]/10 text-[#FD4A12]'
                  : 'border-transparent bg-[#FD4A12]/5 text-[#FD4A12]'
              }`}
            >
              <span>🍴</span>
              <span>츄라이</span>
            </button>

            <button
              type="button"
              onClick={handleHeungMiToggle}
              className={`h-10 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] ${
                isHeungMi
                  ? 'border-gray-400 bg-gray-100 text-gray-700'
                  : 'border-gray-200 bg-gray-50 text-gray-500'
              }`}
            >
              <span>👍</span>
              <span>흥미로워요</span>
            </button>
          </div>

          <p className="text-[10px] text-gray-300 font-medium pl-1 mb-8">
            *먹어봤어요!
          </p>

          <section className="border-t border-gray-100 pt-6 flex flex-col gap-3">
            
            <div className="flex justify-between items-center text-[10px] font-medium text-gray-400">
              <span className="font-bold text-gray-600">익명N</span>
              <span>2026.05.17.NN:NN</span>
            </div>

            <p className="text-xs text-black font-semibold leading-relaxed break-all">
              댓글
            </p>

            <div className="flex justify-end mt-1">
              <button 
                type="button"
                className="text-[10px] font-black text-[#FD4A12] flex items-center gap-1 hover:opacity-80"
              >
                <span>답글</span>
                <span className="text-xs">🔄</span>
              </button>
            </div>
            
          </section>

        </div>
      </div>
    </div>
  );
}