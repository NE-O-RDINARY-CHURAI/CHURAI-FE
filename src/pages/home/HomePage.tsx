import ArrowIcon from '../../assets/icons/arrow-down.svg?react'
import dujjonku from '../../assets/images/dujjonku.png'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import SquareCard from '../../components/card/SquareCard'
import ListCard from '../../components/card/ListCard'

const TOP3_MOCK = [
  { id: 1, rank: 1, title: '두부 김치 볶음', likes: 120, views: 340, shares: 56 },
  { id: 2, rank: 2, title: '계란말이 김밥', likes: 98, views: 210, shares: 33 },
  { id: 3, rank: 3, title: '된장찌개 정석', likes: 87, views: 190, shares: 28 },
]

const RECIPE_LIST_MOCK = [
  {
    id: 1,
    category: '한식',
    nickname: '요리왕',
    title: '두부 김치 볶음 황금 레시피',
    commentCount: 12,
    likeCount: 120,
    viewCount: 340,
  },
  {
    id: 2,
    category: '일식',
    nickname: '집밥러버',
    title: '계란말이 김밥 완벽 가이드',
    commentCount: 8,
    likeCount: 98,
    viewCount: 210,
  },
  {
    id: 3,
    category: '중식',
    nickname: '쉐프닝',
    title: '된장찌개 정석 레시피',
    commentCount: 5,
    likeCount: 87,
    viewCount: 190,
  },
  {
    id: 4,
    category: '양식',
    nickname: '홈쿡',
    title: '크림 파스타 쉽게 만들기',
    commentCount: 20,
    likeCount: 75,
    viewCount: 160,
  },
  {
    id: 5,
    category: '한식',
    nickname: '밥심',
    title: '닭갈비 덮밥 꿀팁 공유',
    commentCount: 15,
    likeCount: 110,
    viewCount: 290,
  },
  {
    id: 6,
    category: '분식',
    nickname: '떡볶이왕',
    title: '국물 떡볶이 비법 레시피',
    commentCount: 30,
    likeCount: 200,
    viewCount: 520,
  },
  {
    id: 7,
    category: '일식',
    nickname: '라멘러버',
    title: '진한 돈코츠 라멘 만들기',
    commentCount: 18,
    likeCount: 145,
    viewCount: 380,
  },
  {
    id: 8,
    category: '양식',
    nickname: '브런치',
    title: '아보카도 토스트 브런치 레시피',
    commentCount: 9,
    likeCount: 63,
    viewCount: 140,
  },
  {
    id: 9,
    category: '한식',
    nickname: '집밥달인',
    title: '순두부찌개 깊은 맛 내는 법',
    commentCount: 11,
    likeCount: 90,
    viewCount: 230,
  },
  {
    id: 10,
    category: '중식',
    nickname: '웍마스터',
    title: '새우 볶음밥 황금 레시피',
    commentCount: 7,
    likeCount: 58,
    viewCount: 175,
  },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <main className="px-3">
      <section className="relative h-20 overflow-hidden rounded-lg bg-linear-to-b from-[#ECECB8] to-[#DCDC8D]">
        <div className="absolute bottom-3 left-3 text-[#5D3426]">
          <p className="caption1-medium">제 2의 두쫀쿠 내가 만들어 볼까?</p>
          <p className="body2-semibold">다음 트렌드가 될 레시피를 공유해주세요!</p>
        </div>
        <div className="absolute top-0 right-0">
          <img src={dujjonku} alt="두쫀쿠" />
        </div>
      </section>

      <section className="mt-5">
        <h2 className="heading1-semibold">츄라이 레시피 Top3</h2>
        <p className="body2-medium text-gray3">이번주 가장 핫한 꿀조합 확인하기</p>

        <div className="mt-4">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={12}
            slidesPerView="auto"
            className="overflow-visible!"
          >
            {TOP3_MOCK.map(item => (
              <SwiperSlide key={item.id} className="w-auto!">
                <SquareCard {...item} onClick={() => navigate(`/boardDetail/${item.id}`)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="mt-6 mb-10">
        <div className="flex items-center justify-between">
          <h3 className="body2-semibold">츄라이 레시피를 확인해보세요!</h3>
          <button
            className="caption1-regular text-gray3 flex items-center gap-1"
            onClick={() => navigate('/board')}
          >
            <span>더보기</span>
            <ArrowIcon className="h-4 w-4 rotate-270" />
          </button>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          {RECIPE_LIST_MOCK.map((item, index) => (
            <ListCard key={index} {...item} />
          ))}
        </div>
        <div className="mt-3 flex justify-center">
          <button
            className="caption1-regular text-gray3 flex items-center gap-1"
            onClick={() => navigate('/board')}
          >
            <span>더보기</span>
            <ArrowIcon className="h-4 w-4 rotate-270" />
          </button>
        </div>
      </section>
    </main>
  )
}
