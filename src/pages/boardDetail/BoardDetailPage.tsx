import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  getPostDetail,
  createComment,
} from '../../apis/board/boardApi';

import ForkIcon from '../../assets/icons/fork.svg';
import GoodIcon from '../../assets/icons/good.svg';
import EyeIcon from '../../assets/icons/eye.svg';
import TalkIcon from '../../assets/icons/talk.svg';

// 🌟 백엔드 로그 실물 구조에 맞춰 replies 자식 배열 타입을 명시적으로 바인딩 유도
interface CommentItem {
  id: number;
  nickname: string;
  contents: string;
  parentId: number | null;
  createdAt: string;
  replies?: CommentItem[]; // 👈 백엔드 찐 데이터의 핵심 키 보완 장착
}

export default function BoardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [boardData, setBoardData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isChuRai, setIsChuRai] = useState(false);
  const [isHeungMi, setIsHeungMi] = useState(false);

  const [chuRaiCount, setChuRaiCount] = useState(0);
  const [heungMiCount, setHeungMiCount] = useState(0);

  // 댓글 상태 보관함
  const [commentsList, setCommentsList] = useState<CommentItem[]>([]);

  // 입력 상태
  const [commentInput, setCommentInput] = useState('');
  const [activeParentId, setActiveParentId] = useState<number | null>(null);

  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);

  // 🔄 단일 상세조회 API 하나로 게시글 정보와 23개의 댓글 트리 객체를 통째로 낚아채는 코어 함수
  const fetchPostDetail = async () => {
    if (!id) return;

    try {
      const data: any = await getPostDetail(id);

      console.log('콘솔 검증 완료 찐 데이터:', data);

      setBoardData(data);

      setChuRaiCount(data?.churaiCount || 0);
      setHeungMiCount(data?.interestedCount || 0);

      // 🌟 [종결 매칭] 콘솔창에서 생존이 확인된 23개의 구조화된 comments 배열을 다이렉트로 주입합니다!
      const fetchedComments: CommentItem[] = data?.comments || [];
      setCommentsList(fetchedComments);
      
    } catch (error) {
      console.error('상세 조회 실패:', error);
      alert('게시글을 불러오지 못했습니다.');
      navigate('/board');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [id]);

  const handleBackNavigation = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    navigate('/board');
  };

  const handleChuRaiToggle = () => {
    if (isChuRai) {
      setChuRaiCount((prev) => prev - 1);
    } else {
      setChuRaiCount((prev) => prev + 1);
    }

    setIsChuRai(!isChuRai);
  };

  const handleHeungMiToggle = () => {
    if (isHeungMi) {
      setHeungMiCount((prev) => prev - 1);
    } else {
      setHeungMiCount((prev) => prev + 1);
    }

    setIsHeungMi(!isHeungMi);
  };

  // 댓글 등록
  const handleCommentSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !id ||
      !commentInput.trim() ||
      isCommentSubmitting
    ) {
      return;
    }

    try {
      setIsCommentSubmitting(true);

      // 서버로 댓글 데이터 발송
      await createComment(id, {
        contents: commentInput.trim(),
        parentId: activeParentId,
      });

      // 즉시 UI 반영용 가상 최적화 데이터 주입
      const newComment: CommentItem = {
        id: Date.now(),
        nickname: '익명',
        contents: commentInput.trim(),
        parentId: activeParentId,
        createdAt: new Date().toISOString(),
        replies: []
      };

      setCommentsList((prev) => [...prev, newComment]);

      // 댓글 수 카운터 증가
      setBoardData((prev: any) => ({
        ...prev,
        commentCount: (prev?.commentCount || 0) + 1,
      }));

      setCommentInput('');
      setActiveParentId(null);

      // 🔄 등록 직후 검증 완료된 단일 상세 데이터 파이프라인만 새로고침!
      await fetchPostDetail();
    } catch (error) {
      console.error('댓글 등록 실패:', error);
      alert('댓글 등록에 실패했습니다.');
    } finally {
      setIsCommentSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-xs font-semibold text-gray-400">
        레시피를 불러오는 중...
      </div>
    );
  }

  if (!boardData) return null;

  // 🌟 [대교정] 백엔드가 이미 루트 댓글들만 깔끔하게 선별해서 정렬해 보내주므로, 
  // 잘못된 parentId 필터 조건을 과감히 걷어내고 배열 원본을 그대로 루트 가드로 세워 흐르게 만듭니다!
  const rootComments = commentsList;

  return (
    <div className="min-h-screen bg-slate-100 py-10 flex justify-center items-start">
      <div className="w-[360px] bg-white shadow-md overflow-hidden flex flex-col rounded-2xl pb-6">

        {/* 🛠️ [교정 완료] 헤더의 배경색을 진한 회색(bg-gray-100)으로 시원하게 톤업 완료! */}
        <header className="w-full px-[28px] py-[20px] bg-gray-100 flex items-center relative select-none">
          <button
            type="button"
            onClick={handleBackNavigation}
            className="flex items-center justify-center hover:opacity-70 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 stroke-black"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </header>

        {/* 이미지 */}
        <section className="w-full h-[200px] bg-gray-50 flex gap-2 overflow-x-auto p-2 scrollbar-none">
          {boardData.imageUrls &&
          boardData.imageUrls.length > 0 ? (
            boardData.imageUrls.map(
              (url: string, index: number) => (
                <div
                  key={index}
                  className="w-[180px] h-full flex-shrink-0 overflow-hidden rounded-md"
                >
                  <img
                    src={url}
                    alt="게시글 이미지"
                    className="w-full h-full object-cover"
                  />
                </div>
              )
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-300">
              등록된 사진이 없습니다.
            </div>
          )}
        </section>

        <div className="px-6 pt-5 flex flex-col">

          {/* 작성자 */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-1.5">
            <span>
              {boardData.category === 'MAIN_DISH'
                ? '식사'
                : '디저트'}
            </span>
            <span>|</span>
            <span>{boardData.nickname}</span>
          </div>

          {/* 제목 */}
          <h2 className="text-base font-black text-black leading-snug mb-2.5">
            {boardData.title}
          </h2>

          {/* 카운트 */}
          <div className="flex items-center gap-3 text-[11px] font-bold text-gray-300 mb-5">
            <span className="flex items-center gap-1 text-[#FD4A12]">
              <img
                src={ForkIcon}
                alt="츄라이"
                className="w-3.5 h-3.5"
              />
              <span className="text-black">
                {chuRaiCount}
              </span>
            </span>

            <span className="flex items-center gap-1">
              <img
                src={GoodIcon}
                alt="흥미"
                className="w-3.5 h-3.5"
              />
              <span className="text-black">
                {heungMiCount}
              </span>
            </span>

            <span className="flex items-center gap-1">
              <img
                src={EyeIcon}
                alt="조회수"
                className="w-3.5 h-3.5"
              />
              <span className="text-black">
                {boardData.views || 0}
              </span>
            </span>
          </div>

          {/* 액션 버튼 */}
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            <button
              type="button"
              onClick={handleChuRaiToggle}
              className={`h-10 rounded-xl border text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                isChuRai
                  ? 'border-[#FD4A12] bg-[#FD4A12]/10 text-[#FD4A12]'
                  : 'border-transparent bg-[#FD4A12]/5 text-[#FD4A12]'
              }`}
            >
              <img
                src={ForkIcon}
                alt="츄라이"
                className="w-3.5 h-3.5"
              />
              <span>츄라이</span>
            </button>

            <button
              type="button"
              onClick={handleHeungMiToggle}
              className={`h-10 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                isHeungMi
                  ? 'border-gray-400 bg-gray-100 text-gray-700'
                  : 'border-gray-200 bg-gray-50 text-gray-500'
              }`}
            >
              <img
                src={GoodIcon}
                alt="흥미"
                className="w-3.5 h-3.5"
              />
              <span>흥미로워요</span>
            </button>
          </div>

          {/* 설명 */}
          <div className="mb-8">
            <label className="text-xs font-bold text-gray-700">
              레시피 설명
            </label>
            <div className="w-full p-4 border border-gray-100 bg-white rounded-xl text-xs leading-relaxed text-gray-800 whitespace-pre-wrap font-medium mt-1.5">
              {boardData.contents}
            </div>
          </div>

          {/* 댓글 리스트 렌더링 */}
          <section className="border-t border-gray-100 pt-5 flex flex-col gap-5 mb-6">
            <div className="text-xs font-black text-gray-800 flex items-center gap-1.5">
              <img
                src={TalkIcon}
                alt="댓글"
                className="w-4 h-4"
              />
              <span>
                댓글 {boardData.commentCount || 0}
              </span>
            </div>

            <div className="flex flex-col gap-5">
              {rootComments.length > 0 ? (
                rootComments.map((comment) => {
                  // 🌟 [대교정] 기존의 수동 전체배열 필터링 구문을 지우고, 
                  // 자바 객체 내부에 실시간 상주가 입증된 comment.replies를 깨끗하게 연결해 줍니다!
                  const childReplies = comment.replies || [];

                  return (
                    <div
                      key={comment.id}
                      className="flex flex-col gap-4"
                    >
                      {/* 부모 댓글 */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[10px] text-gray-400">
                          {/* 백엔드 데이터에 존재하지 않는 닉네임 유실 오류 방지 예외 가드 가공 */}
                          <span className="font-bold text-gray-600">
                            {comment.nickname || '익명 Pioneer'}
                          </span>

                          <button
                            type="button"
                            onClick={() => setActiveParentId(comment.id)}
                            className="text-[#FD4A12] font-black hover:opacity-80 transition-opacity"
                          >
                            답글
                          </button>
                        </div>

                        <p className="text-xs text-gray-800 font-semibold leading-relaxed break-all">
                          {comment.contents}
                        </p>

                        <span className="text-[9px] text-gray-300">
                          {comment.createdAt ? comment.createdAt.substring(5, 16).replace(/-/g, '/') : '05/17 06:04'}
                        </span>
                      </div>

                      {/* 대댓글 들여쓰기 출력부 (replies 연동 싱크 마감) */}
                      {childReplies.map((reply) => (
                        <div
                          key={reply.id}
                          className="pl-4 flex gap-2"
                        >
                          <span className="text-gray-300 select-none">
                            └
                          </span>

                          <div className="flex-1 bg-gray-50 rounded-xl p-2.5">
                            <div className="text-[10px] text-gray-400 font-bold">
                              {reply.nickname || '익명 Pioneer'}
                            </div>

                            <p className="text-xs text-gray-700 font-semibold mt-1 leading-relaxed break-all">
                              {reply.contents}
                            </p>

                            <span className="text-[9px] text-gray-300">
                              {reply.createdAt ? reply.createdAt.substring(5, 16).replace(/-/g, '/') : '05/17 06:04'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-xs text-gray-300 py-4 font-medium">
                  첫 댓글을 작성해보세요!
                </div>
              )}
            </div>
          </section>

          {/* 댓글 입력 인풋바 */}
          <form
            onSubmit={handleCommentSubmit}
            className="w-full flex flex-col gap-2 pt-2 border-t border-gray-50 select-none"
          >
            {activeParentId && (
              <div className="flex justify-between items-center px-2 py-1 rounded-md bg-blue-50 text-[10px] text-blue-500 font-bold">
                <span>답글 작성 중</span>
                <button
                  type="button"
                  onClick={() => setActiveParentId(null)}
                >
                  취소
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder={
                  activeParentId
                    ? '답글을 입력해주세요'
                    : '댓글을 입력해주세요'
                }
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 h-10 px-4 bg-gray-100 rounded-xl text-xs font-semibold focus:outline-none placeholder:text-gray-300"
              />

              <button
                type="submit"
                disabled={
                  !commentInput.trim() ||
                  isCommentSubmitting
                }
                className="w-10 h-10 rounded-xl bg-[#FD4A12] flex items-center justify-center hover:opacity-90 transition-all active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 stroke-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 10l7-7 7 7M12 3v18"
                  />
                </svg>
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}