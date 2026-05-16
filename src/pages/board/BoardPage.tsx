import { useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PostCard from '../../components/card/ListCard'
import { getRanking, getBoardPosts, type RankingPost, type BoardPost, type Category } from '../../apis/board/board.clap.Api'
import BackIcon from '../../assets/icons/back.svg?react'
import SearchIcon from '../../assets/icons/search.svg?react'

type Sort = 'ranking' | 'latest'
const CHUNK = 10

const CATEGORY_TABS: { label: string; value: Category; icon: React.ReactNode }[] = [
  {
    label: '전체',
    value: '',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path fill="currentColor" d="M13.333 11.333a.667.667 0 0 1 0 1.334H2.667a.667.667 0 1 1 0-1.334h10.666Zm0-4a.667.667 0 1 1 0 1.334H2.667a.667.667 0 0 1 0-1.334h10.666Zm0-4a.667.667 0 1 1 0 1.334H2.667a.667.667 0 0 1 0-1.334h10.666Z" />
      </svg>
    ),
  },
  {
    label: '식사',
    value: 'MAIN_DISH',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path fill="currentColor" d="M6 21V10.872A3.997 3.997 0 0 1 3 7V4a1 1 0 0 1 2 0v3c0 .553.224 1.052.586 1.414.123.124.263.228.414.315V4a1 1 0 0 1 2 0v4.73a1.997 1.997 0 0 0 .848-.964C8.948 7.523 9 7.263 9 7V4a1 1 0 0 1 2 0v3a4 4 0 0 1-3 3.872V21a1 1 0 1 1-2 0ZM19 8c0-.874-.263-1.674-.679-2.229C17.91 5.222 17.422 5 17 5c-.422 0-.91.222-1.321.771C15.263 6.326 15 7.126 15 8c0 .874.263 1.674.679 2.229.412.549.899.771 1.321.771.422 0 .91-.222 1.321-.771C18.737 9.674 19 8.873 19 8Zm2 0c0 1.247-.37 2.483-1.08 3.429-.5.669-1.164 1.173-1.92 1.414V21a1 1 0 1 1-2 0v-8.157c-.756-.241-1.42-.745-1.92-1.414C13.37 10.483 13 9.247 13 8c0-1.247.37-2.483 1.08-3.429C14.791 3.621 15.83 3 17 3s2.208.62 2.92 1.571C20.63 5.517 21 6.753 21 8Z" />
      </svg>
    ),
  },
  {
    label: '디저트',
    value: 'DESSERT',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path fill="currentColor" d="M12 2a5 5 0 0 1 4.546 2.916A5.002 5.002 0 0 1 21 9.5c0 2.234-1.302 4.16-3.2 5.08V17a2 2 0 0 1-2 2H8.2a2 2 0 0 1-2-2v-2.42C4.302 13.66 3 11.734 3 9.5a5.002 5.002 0 0 1 4.454-4.584A5 5 0 0 1 12 2Zm0 2a3 3 0 0 0-2.83 2.006A1 1 0 0 1 8.22 6.6 3 3 0 0 0 5 9.5c0 1.48.856 2.75 2.1 3.37A1 1 0 0 1 7.8 13.8V17h8.4v-3.2a1 1 0 0 1 .7-.953C18.144 12.25 19 10.98 19 9.5a3 3 0 0 0-3.22-2.9A1 1 0 0 1 14.83 6 3 3 0 0 0 12 4Zm0 13v3a1 1 0 1 1-2 0v-3h2Zm2 0v3a1 1 0 1 1-2 0v-3h2Z" />
      </svg>
    ),
  },
]

export default function BoardPage() {
  const navigate = useNavigate()
  const [sort, setSort] = useState<Sort>('ranking')
  const [category, setCategory] = useState<Category>('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const allData = useRef<(RankingPost | BoardPost)[]>([])
  const [displayCount, setDisplayCount] = useState(CHUNK)

  const observerRef = useRef<IntersectionObserver | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const load = useCallback(async (s: Sort, cat: Category) => {
    setLoading(true)
    setError(false)
    try {
      let newData: (RankingPost | BoardPost)[]
      if (s === 'ranking') {
        newData = await getRanking(cat, 50)
      } else {
        const res = await getBoardPosts(cat)
        newData = res.content
      }
      allData.current = newData
      setDisplayCount(CHUNK)
    } catch (e) {
      console.error(e)
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load(sort, category)
  }, [sort, category, load])

  const lastCardRef = useCallback((node: HTMLElement | null) => {
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setDisplayCount(prev => Math.min(prev + CHUNK, allData.current.length))
      }
    })
    if (node) observerRef.current.observe(node)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => () => observerRef.current?.disconnect(), [])

  const visiblePosts = allData.current.slice(0, displayCount)
  const hasMore = displayCount < allData.current.length

  return (
    <div className="flex min-h-dvh flex-col bg-[#FAFAFA]">
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

      <main className="flex-1 px-4 pb-3 pt-6">
        {/* 검색바 */}
        <button
          type="button"
          onClick={() => navigate('/search', { state: { fromBoard: true } })}
          className="mb-4 flex h-10 w-full items-center gap-2 rounded-medium4 border border-gray2 bg-white px-3 transition-colors duration-150 hover:border-main"
        >
          <span className="caption1-medium flex-1 truncate text-left text-gray2">
            자유롭게 검색해보세요!
          </span>
          <SearchIcon className="h-5 w-5 shrink-0 text-main" />
        </button>

        {/* 타이틀 + 정렬 */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="body2-semibold truncate text-black">
            츄라이 레시피를 확인해보세요!
          </span>
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(prev => !prev)}
              className="caption1-medium flex items-center gap-1 rounded px-2 py-1 text-gray3 transition-colors duration-150 hover:text-gray4"
            >
              {sort === 'ranking' ? '인기순' : '최신순'}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full z-10 mt-1 w-20 overflow-hidden rounded-medium4 border border-gray1 bg-white shadow-md">
                {(['ranking', 'latest'] as Sort[]).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => { setSort(s); setDropdownOpen(false) }}
                    className={`w-full px-3 py-2 text-left caption1-medium transition-colors duration-150 hover:bg-gray1 ${sort === s ? 'text-main' : 'text-black'}`}
                  >
                    {s === 'ranking' ? '인기순' : '최신순'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 카테고리 탭 */}
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
          {CATEGORY_TABS.map(tab => {
            const selected = category === tab.value
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setCategory(tab.value)}
                className={`caption1-medium flex shrink-0 items-center gap-1 rounded-[1000px] border px-3 py-1 transition-all duration-150 ${
                  selected ? 'border-main text-main' : 'border-gray2 text-gray2 hover:border-gray3 hover:text-gray3'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* 목록 */}
        {error && (
          <p className="caption1-medium mt-10 text-center text-gray3">오류가 발생했습니다. 다시 시도해주세요.</p>
        )}
        {!loading && !error && allData.current.length === 0 && (
          <p className="caption1-medium mt-10 text-center text-gray3">게시글이 없습니다</p>
        )}

        <div className={`flex flex-col gap-2 transition-opacity duration-200 ${loading ? 'pointer-events-none opacity-40' : 'opacity-100'}`}>
          {visiblePosts.map((post, i) => {
            const isLast = i === visiblePosts.length - 1
            const rank = sort === 'ranking' ? (post as RankingPost).rank : undefined
            return (
              <div key={post.postId} ref={isLast ? lastCardRef : null}>
                <PostCard
                  imageUrl={post.thumbnailUrl}
                  category={post.category}
                  nickname={post.nickname}
                  title={post.title}
                  chuRaiCount={post.chuRaiCount}
                  heungMiCount={post.heungMiCount}
                  rank={rank}
                  onClick={() => navigate(`/boardDetail/${post.postId}`)}
                />
              </div>
            )
          })}
        </div>

        {!loading && hasMore && (
          <p className="caption1-medium mt-4 text-center text-gray3">스크롤하면 더 불러옵니다</p>
        )}
      </main>
    </div>
  )
}
