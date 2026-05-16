import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PostCard from '../../components/card/ListCard'
import { searchPosts, type Post } from '../../apis/search/search'
import SearchIcon from '../../assets/icons/search.svg?react'
import BackIcon from '../../assets/icons/back.svg?react'

export default function SearchPage() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [searched, setSearched] = useState(false) // 검색 실행 여부 (결과 없음 메시지 조건)
  const [page, setPage] = useState(0)
  const [hasNext, setHasNext] = useState(false) // 다음 페이지 존재 여부
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const currentKeyword = useRef('') // 무한스크롤 시 현재 검색어 유지용

  // reset=true면 새 검색, false면 다음 페이지 이어붙이기
  const fetchPosts = useCallback(async (kw: string, pageNum: number, reset: boolean) => {
    setLoading(true)
    setError(false)
    try {
      const data = await searchPosts(kw, pageNum)
      setPosts(prev => (reset ? data.content : [...prev, ...data.content]))
      setHasNext(data.hasNext)
      setPage(pageNum)
    } catch (e) {
      console.error(e)
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSearch = () => {
    const trimmed = keyword.trim()
    if (!trimmed) return
    currentKeyword.current = trimmed
    setSearched(true)
    fetchPosts(trimmed, 0, true)
  }

  // 마지막 카드가 화면에 보이면 다음 페이지 자동 로드 (무한스크롤)
  const lastCardRef = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) observerRef.current.disconnect()
      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNext && !loading) {
          fetchPosts(currentKeyword.current, page + 1, false)
        }
      })
      if (node) observerRef.current.observe(node)
    },
    [hasNext, loading, page, fetchPosts],
  )

  // 페이지 언마운트 시 옵저버 정리
  useEffect(() => {
    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="relative flex h-14 shrink-0 items-center justify-center bg-gray3 px-7">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-7 flex h-6 w-6 shrink-0 items-center justify-center"
          aria-label="뒤로가기"
        >
          <BackIcon className="h-6 w-6 text-white" />
        </button>
        <h1 className="text-base font-medium text-white">검색하기</h1>
      </header>

      <main className="flex-1 px-4 py-3">
        <div className="mb-3 flex h-10 items-center gap-1 rounded-medium4 border border-gray2 bg-white px-3">
          <input
            type="search"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="자유롭게 검색해보세요"
            className="caption1-medium flex-1 bg-transparent text-black outline-none placeholder:text-gray2"
            autoFocus
          />
          {/* 주황 돋보기 = 검색 실행 버튼 */}
          <button
            type="button"
            onClick={handleSearch}
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-main"
            aria-label="검색"
          >
        <SearchIcon
          className="hover:text-gray2 cursor-pointer text-main"
        />
          </button>
        </div>

        {error && (
          <p className="caption1-medium mt-10 text-center text-gray3">오류가 발생했습니다. 다시 시도해주세요.</p>
        )}
        {searched && posts.length === 0 && !loading && !error && (
          <p className="caption1-medium mt-10 text-center text-gray3">검색 결과가 없습니다</p>
        )}
        <div className="flex flex-col gap-2">
          {posts.map((post, i) => (
            // 마지막 카드에만 ref 부착해서 무한스크롤 감지
            <div
              key={post.postId}
              ref={i === posts.length - 1 ? lastCardRef : null}
            >
              <PostCard
                imageUrl={post.thumbnailUrl}
                category={post.category}
                nickname={post.nickname}
                title={post.title}
                commentCount={post.commentCount}
                likeCount={post.chuRaiCount}
                viewCount={post.heungMiCount}
                onClick={() => navigate(`/boardDetail/${post.postId}`)}
              />
            </div>
          ))}
        </div>
        {loading && (
          <p className="caption1-medium mt-4 text-center text-gray3">불러오는 중...</p>
        )}
      </main>
    </div>
  )
}
