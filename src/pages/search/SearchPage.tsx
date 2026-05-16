import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PostCard from '../../components/card/ListCard'
import { searchPosts, type Post } from '../../apis/search/search'

export default function SearchPage() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [searched, setSearched] = useState(false)
  const [page, setPage] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const currentKeyword = useRef('')

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

  useEffect(() => {
    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex h-14 shrink-0 items-center gap-2 bg-gray1 px-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center"
          aria-label="뒤로가기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="flex h-10 flex-1 items-center gap-1 rounded-medium4 border border-gray2 bg-white px-3">
          <input
            type="search"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="검색어를 입력해주세요."
            className="caption1-medium flex-1 bg-transparent text-black outline-none placeholder:text-gray2"
            autoFocus
          />
          <button
            type="button"
            onClick={handleSearch}
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-main"
            aria-label="검색"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" d="M16 10a6 6 0 1 0-12 .002A6 6 0 0 0 16 10Zm2 0a8 8 0 0 1-1.683 4.903l5.39 5.39a1 1 0 1 1-1.414 1.414l-5.39-5.39c-.563.437-1.18.8-1.841 1.074A8 8 0 1 1 18 10Z" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-3">
        {error && (
          <p className="caption1-medium mt-10 text-center text-gray3">오류가 발생했습니다. 다시 시도해주세요.</p>
        )}
        {searched && posts.length === 0 && !loading && !error && (
          <p className="caption1-medium mt-10 text-center text-gray3">검색 결과가 없습니다</p>
        )}
        <div className="flex flex-col gap-2">
          {posts.map((post, i) => (
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
