import React, { useState, useEffect } from 'react'
import { usePostActions } from '../../hooks/usePostActions'
import { useParams, useNavigate } from 'react-router-dom'

// 🌟 getComments는 필요 없으므로 기존 베이스 API 두 개만 정갈하게 호출합니다.
import { getPostDetail, createComment } from '../../apis/board/boardApi'

import ForkIcon from '../../assets/icons/fork.svg'
import GoodIcon from '../../assets/icons/good.svg'
import EyeIcon from '../../assets/icons/eye.svg'
import TalkIcon from '../../assets/icons/talk.svg'

interface CommentItem {
  id: number
  nickname: string
  contents: string
  parentId: number | null
  createdAt: string
}

export default function BoardDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [boardData, setBoardData] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { churaid, toggleChurai, interested, toggleInterested } = usePostActions(Number(id))

  const [chuRaiCount, setChuRaiCount] = useState(0)
  const [heungMiCount, setHeungMiCount] = useState(0)

  // 댓글 상태 보관함
  const [commentsList, setCommentsList] = useState<CommentItem[]>([])

  // 입력 상태
  const [commentInput, setCommentInput] = useState('')
  const [activeParentId, setActiveParentId] = useState<number | null>(null)

  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false)

  useEffect(() => {
    let cancelled = false
    getPostDetail(id!)
      .then((data: any) => {
        if (cancelled) return
        setBoardData(data)
        setChuRaiCount(data?.churaiCount || 0)
        setHeungMiCount(data?.interestedCount || 0)
        setCommentsList(data?.comments || [])
      })
      .catch(() => {
        alert('게시글을 불러오지 못했습니다.')
        navigate('/board')
      })
      .finally(() => setIsLoading(false))
    return () => {
      cancelled = true
    }
  }, [id])

  const handleBackNavigation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate('/board')
  }

  // 댓글 등록
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!id || !commentInput.trim() || isCommentSubmitting) {
      return
    }

    try {
      setIsCommentSubmitting(true)

      // 서버로 댓글 데이터 발송
      await createComment(id, {
        contents: commentInput.trim(),
        parentId: activeParentId,
      })

      // 즉시 UI 반영용 가상 최적화 데이터 주입
      const newComment: CommentItem = {
        id: Date.now(),
        nickname: '익명',
        contents: commentInput.trim(),
        parentId: activeParentId,
        createdAt: new Date().toISOString(),
      }

      setCommentsList(prev => [...prev, newComment])

      // 댓글 수 카운터 증가
      setBoardData((prev: any) => ({
        ...prev,
        commentCount: (prev?.commentCount || 0) + 1,
      }))

      setCommentInput('')
      setActiveParentId(null)

      // 🔄 등록 직후 검증 완료된 단일 상세 데이터 파이프라인만 새로고침!
      await getPostDetail(id).then(data => {
        setBoardData(data)
        setChuRaiCount(data?.churaiCount || 0)
        setHeungMiCount(data?.interestedCount || 0)
        setCommentsList(data?.comments || [])
      })
    } catch (error) {
      console.error('댓글 등록 실패:', error)
      alert('댓글 등록에 실패했습니다.')
    } finally {
      setIsCommentSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-xs font-semibold text-gray-400">
        레시피를 불러오는 중...
      </div>
    )
  }

  if (!boardData) return null

  // 부모 댓글만 추출
  const rootComments = commentsList.filter(comment => comment.parentId === null)

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <div className="flex w-full flex-1 flex-col">
        {/* 헤더 */}
        <header className="bg-main relative flex h-14 shrink-0 items-center justify-center px-7">
          <button
            type="button"
            onClick={handleBackNavigation}
            className="absolute left-7 flex h-6 w-6 items-center justify-center"
            aria-label="뒤로가기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 stroke-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-base font-medium text-white">레시피 상세</h1>
        </header>

        {/* 이미지 */}
        <section className="flex h-[200px] w-full scrollbar-none gap-2 overflow-x-auto bg-gray-50 p-2">
          {boardData.imageUrls && boardData.imageUrls.length > 0 ? (
            boardData.imageUrls.map((url: string, index: number) => (
              <div
                key={index}
                className="h-full w-[180px] flex-shrink-0 overflow-hidden rounded-md"
              >
                <img src={url} alt="게시글 이미지" className="h-full w-full object-cover" />
              </div>
            ))
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-gray-300">
              등록된 사진이 없습니다.
            </div>
          )}
        </section>

        <div className="flex flex-col px-6 pt-5">
          {/* 작성자 */}
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-gray-400">
            <span>{boardData.category === 'MAIN_DISH' ? '식사' : '디저트'}</span>

            <span>|</span>

            <span>{boardData.nickname}</span>
          </div>

          {/* 제목 */}
          <h2 className="mb-2.5 text-base leading-snug font-black text-black">{boardData.title}</h2>

          {/* 카운트 */}
          <div className="mb-5 flex items-center gap-3 text-[11px] font-bold text-gray-300">
            <span className="flex items-center gap-1 text-[#FD4A12]">
              <img src={ForkIcon} alt="츄라이" className="h-3.5 w-3.5" />
              <span className="text-black">{chuRaiCount + (churaid ? 1 : 0)}</span>
            </span>

            <span className="flex items-center gap-1">
              <img src={GoodIcon} alt="흥미" className="h-3.5 w-3.5" />
              <span className="text-black">{heungMiCount + (interested ? 1 : 0)}</span>
            </span>

            <span className="flex items-center gap-1">
              <img src={EyeIcon} alt="조회수" className="h-3.5 w-3.5" />
              <span className="text-black">{boardData.views || 0}</span>
            </span>
          </div>

          {/* 액션 버튼 */}
          <div className="mb-6 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={toggleChurai}
              className={`flex h-10 items-center justify-center gap-1.5 rounded-xl border text-xs font-black transition-all ${
                churaid
                  ? 'border-[#FD4A12] bg-[#FD4A12]/10 text-[#FD4A12]'
                  : 'border-transparent bg-[#FD4A12]/5 text-[#FD4A12]'
              }`}
            >
              <img src={ForkIcon} alt="츄라이" className="h-3.5 w-3.5" />
              <span>츄라이</span>
            </button>

            <button
              type="button"
              onClick={toggleInterested}
              className={`flex h-10 items-center justify-center gap-1.5 rounded-xl border text-xs font-bold transition-all ${
                interested
                  ? 'border-gray-400 bg-gray-100 text-gray-700'
                  : 'border-gray-200 bg-gray-50 text-gray-500'
              }`}
            >
              <img src={GoodIcon} alt="흥미" className="h-3.5 w-3.5" />
              <span>흥미로워요</span>
            </button>
          </div>

          {/* 설명 */}
          <div className="mb-8">
            <label className="text-xs font-bold text-gray-700">레시피 설명</label>

            <div className="mt-1.5 w-full rounded-xl border border-gray-100 bg-white p-4 text-xs leading-relaxed font-medium whitespace-pre-wrap text-gray-800">
              {boardData.contents}
            </div>
          </div>

          {/* 댓글 리스트 렌더링 */}
          <section className="mb-6 flex flex-col gap-5 border-t border-gray-100 pt-5">
            <div className="flex items-center gap-1.5 text-xs font-black text-gray-800">
              <img src={TalkIcon} alt="댓글" className="h-4 w-4" />
              <span>댓글 {boardData.commentCount || 0}</span>
            </div>

            <div className="flex flex-col gap-5">
              {rootComments.length > 0 ? (
                rootComments.map(comment => {
                  const childReplies = commentsList.filter(reply => reply.parentId === comment.id)

                  return (
                    <div key={comment.id} className="flex flex-col gap-4">
                      {/* 부모 댓글 */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-[10px] text-gray-400">
                          <span className="font-bold text-gray-600">
                            {comment.nickname || '익명'}
                          </span>

                          <button
                            type="button"
                            onClick={() => setActiveParentId(comment.id)}
                            className="font-black text-[#FD4A12]"
                          >
                            답글
                          </button>
                        </div>

                        <p className="text-xs font-semibold text-gray-800">{comment.contents}</p>

                        <span className="text-[9px] text-gray-300">
                          {comment.createdAt
                            ? comment.createdAt.substring(5, 16).replace(/-/g, '/')
                            : '05/17 06:04'}
                        </span>
                      </div>

                      {/* 대댓글 들여쓰기 */}
                      {childReplies.map(reply => (
                        <div key={reply.id} className="flex gap-2 pl-4">
                          <span className="text-gray-300 select-none">└</span>

                          <div className="flex-1 rounded-xl bg-gray-50 p-2.5">
                            <div className="text-[10px] font-bold text-gray-400">
                              {reply.nickname || '익명'}
                            </div>

                            <p className="mt-1 text-xs font-semibold text-gray-700">
                              {reply.contents}
                            </p>

                            <span className="text-[9px] text-gray-300">
                              {reply.createdAt
                                ? reply.createdAt.substring(5, 16).replace(/-/g, '/')
                                : '05/17 06:04'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                })
              ) : (
                <div className="py-4 text-center text-xs font-medium text-gray-300">
                  첫 댓글을 작성해보세요!
                </div>
              )}
            </div>
          </section>

          {/* 댓글 입력 인풋바 */}
          <form
            onSubmit={handleCommentSubmit}
            className="flex w-full flex-col gap-2 border-t border-gray-50 pt-2 select-none"
          >
            {activeParentId && (
              <div className="flex items-center justify-between rounded-md bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-500">
                <span>답글 작성 중</span>
                <button type="button" onClick={() => setActiveParentId(null)}>
                  취소
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder={activeParentId ? '답글을 입력해주세요' : '댓글을 입력해주세요'}
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                className="h-10 flex-1 rounded-xl bg-gray-100 px-4 text-xs font-semibold focus:outline-none"
              />

              <button
                type="submit"
                disabled={!commentInput.trim() || isCommentSubmitting}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FD4A12]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 stroke-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7 7 7M12 3v18" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
