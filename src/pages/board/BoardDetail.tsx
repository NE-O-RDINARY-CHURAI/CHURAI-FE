import React, { useState, useEffect } from 'react';
import { usePostActions } from '../../hooks/usePostActions';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostDetail, createComment } from '../../apis/board/boardApi';
import type { PostDetailResponse } from '../../apis/board/boardApi';

import Button from '../../components/button/Button';
import Tag from '../../components/tag/Tag';
import SquareCard from '../../components/card/SquareCard';

import GoodIcon from '../../assets/icons/good.svg?react';
import EyeIcon from '../../assets/icons/eye.svg?react';
import ForkIcon from '../../assets/icons/fork.svg?react';

// 🌟 HomePage의 카테고리 라벨 스펙 완벽 결합
const CATEGORY_LABEL: Record<string, string> = {
  MAIN_DISH: '식사 레시피',
  MEAL: '식사 레시피',
  DESSERT: '디저트',
};

interface CommentItem {
  id: number;
  contents: string;
  createdAt: string;
  replies: CommentItem[];
}

export default function BoardDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [boardData, setBoardData] = useState<PostDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [commentsList, setCommentsList] = useState<CommentItem[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [activeParentId, setActiveParentId] = useState<number | null>(null);
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);

  const { churaid, toggleChurai, interested, toggleInterested } = usePostActions(Number(id));

  const fetchPostDetail = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const data = await getPostDetail(id);
      setBoardData(data);
      setCommentsList((data as any).comments || []);
    } catch (error) {
      console.error('게시글 상세 조회 실패:', error);
      alert('존재하지 않거나 삭제된 레시피 게시글입니다.');
      navigate('/board');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCommentsList([]); 
    fetchPostDetail();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !commentInput.trim() || isCommentSubmitting) return;

    try {
      setIsCommentSubmitting(true);
      
      await createComment(id, {
        contents: commentInput.trim(),
        parentId: activeParentId,
      });

      setCommentInput('');
      setActiveParentId(null);

      const freshData = await getPostDetail(id);
      setCommentsList((freshData as any).comments || []);
    } catch (error) {
      console.error('댓글 등록 실패:', error);
      alert('댓글 등록에 실패했습니다.');
    } finally {
      setIsCommentSubmitting(false);
    }
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
        
        {/* ① 🛠️ [교정 완료] 홈 규격 맞춤형 정갈한 회색 헤더 영역 */}
        <header className="mb-6 border-b border-gray1 pb-4 select-none">
          {/* 주황색 포인트를 차분한 회색 조셉(bg-gray1 text-gray4) 스타일 칩으로 전격 교체 */}
          <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-600 mb-2">
            {CATEGORY_LABEL[boardData.category] ?? boardData.category}
          </span>
          <h1 className="text-2xl font-bold text-black mb-3">{boardData.title}</h1>
          
          <div className="flex justify-between items-center text-sm text-gray3">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray4">{boardData.nickname}</span>
              <span className="text-gray2">|</span>
              <span>{boardData.createdAt ? boardData.createdAt.substring(0, 10) : '2026.05.17'}</span> 
            </div>
            
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1" title="흥미요 카운트">
                <EyeIcon className="w-4 h-4 text-gray3"/>
                {boardData.interestedCount || 0}
              </span>
              <span className="flex items-center gap-1" title="공유 스택">
                <ForkIcon className="w-4 h-4 text-gray3"/>
                {boardData.churaiCount || 0}
              </span>
            </div>
          </div>
        </header>

        {/* 📸 레시피 이미지 렌더링 구역 */}
        {boardData.imageUrls && boardData.imageUrls.length > 0 && (
          <section className="mb-6 flex flex-col gap-3 select-none">
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
        <section className="mt-12 pt-6 border-t border-gray1 flex flex-col items-center gap-6 select-none">
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
            <Button variant="tertiary" className="flex-1" onClick={() => navigate('/board')}>
              목록으로 돌아가기
            </Button>
            <Button variant="secondary" className="flex-1" onClick={() => navigate(`/boardEdit/${id}`)}>
              수정하기
            </Button>
          </div>
        </section>

        {/* 💬 댓글/대댓글 UI 구역 */}
        <section className="mt-12 pt-8 border-t border-gray1 flex flex-col gap-6">
          <div className="text-base font-bold text-black flex items-center gap-2 select-none">
            <span>댓글</span>
            <span className="text-gray4 font-black">{boardData.commentCount || commentsList.length}</span>
          </div>

          <div className="flex flex-col gap-5">
            {commentsList.length > 0 ? (
              commentsList.map((comment) => {
                const childReplies = comment.replies || [];

                return (
                  <div key={comment.id} className="flex flex-col gap-3 border-b border-gray-50 pb-4">
                    
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-gray-700">익명 Pioneer</span>
                        <button
                          type="button"
                          onClick={() => setActiveParentId(comment.id)}
                          className={`text-xs font-bold transition-colors ${
                            activeParentId === comment.id ? 'text-blue-500' : 'text-gray4 hover:text-black'
                          }`}
                        >
                          {activeParentId === comment.id ? '답글입력중' : '답글'}
                        </button>
                      </div>
                      <p className="text-sm text-gray-800 font-medium leading-relaxed break-all mt-1">
                        {comment.contents}
                      </p>
                      <span className="text-[10px] text-gray-400 mt-0.5">
                        {comment.createdAt ? comment.createdAt.substring(5, 16).replace(/-/g, '/') : '05/17 06:04'}
                      </span>
                    </div>

                    {/* 자식 대댓글 트리 바인딩 */}
                    {childReplies.map((reply) => (
                      <div key={reply.id} className="pl-5 flex gap-2 items-start mt-1">
                        <span className="text-gray-300 text-sm select-none">└</span>
                        <div className="flex-1 bg-gray-50 rounded-xl p-3">
                          <div className="text-xs font-bold text-gray-600">익명 Pioneer</div>
                          <p className="text-sm text-gray-700 font-medium leading-relaxed break-all mt-1">
                            {reply.contents}
                          </p>
                          <span className="text-[10px] text-gray-400 block mt-1">
                            {reply.createdAt ? reply.createdAt.substring(5, 16).replace(/-/g, '/') : '05/17 06:04'}
                          </span>
                        </div>
                      </div>
                    ))}

                  </div>
                );
              })
            ) : (
              <div className="w-full text-center py-6 text-sm font-medium text-gray-300 select-none">
                첫 번째 댓글을 장식해보세요! ✍️
              </div>
            )}
          </div>

          {/* 폼 및 전송 하단바 구역 */}
          <form onSubmit={handleCommentSubmit} className="w-full flex flex-col gap-2 mt-2">
            {activeParentId && (
              <div className="flex justify-between items-center px-3 py-1.5 rounded-lg bg-blue-50 text-xs text-blue-500 font-bold select-none">
                <span>선택한 댓글에 답글을 작성 중입니다.</span>
                <button type="button" onClick={() => setActiveParentId(null)} className="text-gray-400 font-black">취소</button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder={activeParentId ? "답글을 입력해주세요..." : "댓글을 입력해주세요"}
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 h-11 px-4 bg-gray-50 border border-gray1 rounded-xl text-sm font-semibold focus:outline-none focus:bg-white focus:border-gray4 transition-all placeholder:text-gray-300"
              />
              <button
                type="submit"
                disabled={!commentInput.trim() || isCommentSubmitting}
                className={`w-11 h-11 rounded-xl bg-main flex items-center justify-center transition-all active:scale-95 ${
                  commentInput.trim() && !isCommentSubmitting ? 'opacity-100' : 'opacity-40 cursor-not-allowed'
                }`}
                aria-label="댓글 전송"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-white" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7 7 7M12 3v18" />
                </svg>
              </button>
            </div>
          </form>
        </section>

        {/* ⑤ 추천 레시피 구역 */}
        <footer className="mt-16 pt-8 border-t border-gray1 select-none">
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