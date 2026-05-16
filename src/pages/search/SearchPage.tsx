import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import PostCard from '../../components/card/ListCard'
import { searchPosts } from '../../apis/search/search.api'
import type { Post } from '../../apis/search/search.types'
import SearchIcon from '../../assets/icons/search.svg?react'
import BackIcon from '../../assets/icons/back.svg?react'

const CHUNK = 10

export default function SearchPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const fromBoard = location.state?.fromBoard === true

  const [keyword, setKeyword] = useState('')
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [hovered, setHovered] = useState(false)

  const isBoxActive = hovered || keyword.length > 0
  const activeBorder = fromBoard ? 'border-main' : 'border-gray4'
  const boxBorder = isBoxActive ? activeBorder : 'border-gray2'

  const allData = useRef<Post[]>([])
  const [displayCount, setDisplayCount] = useState(CHUNK)

  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleSearch = async () => {
    const trimmed = keyword.trim()
    if (!trimmed) return
    setSearched(true)
    setLoading(true)
    setError(false)
    allData.current = []
    setDisplayCount(CHUNK)
    try {
      const data = await searchPosts(trimmed)
      allData.current = data.content
      setDisplayCount(CHUNK)
    } catch (e) {
      console.error(e)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const lastCardRef = useCallback((node: HTMLElement | null) => {
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setDisplayCount(prev => Math.min(prev + CHUNK, allData.current.length))
      }
    })
    if (node) observerRef.current.observe(node)
  }, [])

  useEffect(() => () => observerRef.current?.disconnect(), [])

  const visiblePosts = allData.current.slice(0, displayCount)
  const hasMore = displayCount < allData.current.length

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      {fromBoard ? (
        <header className="relative flex h-14 shrink-0 items-center justify-center bg-main px-7">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute left-7 flex h-6 w-6 shrink-0 items-center justify-center"
            aria-label="뒤로가기"
          >
            <BackIcon className="h-6 w-6 text-white" />
          </button>
          <h1 className="text-base font-medium text-white">츄라이 랭킹</h1>
        </header>
      ) : (
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
      )}

      <main className="flex-1 px-4 pb-3 pt-6">
        <div
          className={`mb-4 flex h-10 items-center gap-1 rounded-medium4 border bg-white px-3 transition-colors duration-150 ${boxBorder}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <input
            type="search"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="자유롭게 검색해보세요!"
            className="caption1-medium min-w-0 flex-1 bg-transparent text-black outline-none placeholder:text-gray2"
            autoFocus
          />
          <button
            type="button"
            onClick={handleSearch}
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-main"
            aria-label="검색"
          >
            <SearchIcon className="h-5 w-5 text-main" />
          </button>
        </div>

        {error && (
          <p className="caption1-medium mt-10 text-center text-gray3">오류가 발생했습니다. 다시 시도해주세요.</p>
        )}
        {searched && allData.current.length === 0 && !loading && !error && (
          <p className="caption1-medium mt-10 text-center text-gray3">검색 결과가 없습니다</p>
        )}

        <div className="flex flex-col gap-2">
          {visiblePosts.map((post, i) => {
            const isLast = i === visiblePosts.length - 1
            return (
              <div key={post.postId} ref={isLast ? lastCardRef : null}>
                <PostCard
                  imageUrl={post.thumbnailUrl}
                  category={post.category}
                  nickname={post.nickname}
                  title={post.title}
                  chuRaiCount={post.chuRaiCount}
                  heungMiCount={post.heungMiCount}
                  onClick={() => navigate(`/boardDetail/${post.postId}`)}
                />
              </div>
            )
          })}
        </div>

        {loading && (
          <p className="caption1-medium mt-4 text-center text-gray3">불러오는 중...</p>
        )}
        {!loading && hasMore && (
          <p className="caption1-medium mt-4 text-center text-gray3">스크롤하면 더 불러옵니다</p>
        )}
      </main>
    </div>
  )
}
