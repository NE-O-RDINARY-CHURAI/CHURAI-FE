import { useState } from 'react'
// 🌟 라우팅 처리를 위한 리액트 라우터 돔의 기능들을 가져옵니다.
import { Routes, Route } from 'react-router-dom'

import Button from './components/button/Button'
import Tag from './components/tag/Tag'
import SelectBox from './components/selectbox/SelectBox'
import Dropdown from './components/dropdown/Dropdown'
import SquareCard from './components/card/SquareCard'

// 🌟 새로 만든 게시글 생성 페이지 컴포넌트를 가져옵니다.
import BoardCreate from './pages/board/BoardCreate'

function App() {
  const [category, setCategory] = useState<'MEAL' | 'DESSERT' | ''>('')
  const [tags, setTags] = useState<string[]>(['민트초코', '개척레시피', '해커톤'])
  const [sort, setSort] = useState('전체')

  const handleTagDelete = (targetTag: string) => {
    setTags(tags.filter(tag => tag !== targetTag))
  }

  return (
    // 🌟 Routes를 통해 주소창의 주소에 따라 서로 다른 화면을 보여줍니다.
    <Routes>
      
      {/* 1. 🌟 주소창에 /boardCreate 를 치고 들어왔을 때 열리는 전용 경로 */}
      <Route path="/boardCreate" element={<BoardCreate />} />

      {/* 2. 🌟 기존 기본 주소(localhost:5173/)로 들어왔을 때 기존 UI KIT 화면을 그대로 띄워줍니다. */}
      <Route 
        path="/" 
        element={
          <div className="bg-slate-100 px-4 py-6">
            <main className="">
              <header className="mb-8 border-b border-slate-100 pb-4">
                <p className="text-main text-sm font-semibold">Taste Pioneers UI KIT</p>
                <h1 className="mt-1 text-2xl font-bold text-black">공통 UI 컴포넌트 최종 검증</h1>
              </header>

              <div className="grid grid-cols-1 gap-8">
                {/* 왼쪽 영역: 기존 컨트롤 테스트 (SelectBox, Tag, Button) */}
                <div className="space-y-6 md:col-span-1">
                  <section className="bg-gray1 space-y-2 rounded-2xl p-4">
                    <h2 className="caption2-medium text-gray3 tracking-wider uppercase">
                      SelectBox Test
                    </h2>
                    <SelectBox
                      label="카테고리 설정"
                      value={category}
                      onChange={val => setCategory(val)}
                    />
                  </section>

                  <section className="bg-gray1 space-y-3 rounded-2xl p-4">
                    <h2 className="caption2-medium text-gray3 tracking-wider uppercase">Tag Test</h2>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <Tag key={tag} variant="default" onDelete={() => handleTagDelete(tag)}>
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </section>

                  <section className="bg-gray1 space-y-3 rounded-2xl p-4">
                    <h2 className="caption2-medium text-gray3 tracking-wider uppercase">
                      Button Hover Test
                    </h2>
                    <Button variant="primary" width="full">
                      레시피 개척하기
                    </Button>
                    <div className="flex space-x-2">
                      <Button variant="secondary" className="flex-1">
                        인정해요 👍
                      </Button>
                      <Button variant="tertiary" className="flex-1">
                        뒤로가기
                      </Button>
                    </div>
                  </section>
                </div>

                {/* 오른쪽 영역: 새롭게 구현한 SquareCard 검증 구역 (2컬럼 차지) */}
                <div className="space-y-4 md:col-span-2">
                  <h2 className="caption2-medium text-gray3 px-2 tracking-wider uppercase">
                    SquareCard Test (왕관 & 말줄임 검증)
                  </h2>

                  {/* 카드를 이쁘게 가로로 배치하기 위해 flex 랩핑 */}
                  <div className="flex flex-col justify-start gap-6 p-2">
                    {/* 1등 카드: 1st-badge.svg 확인 */}
                    <SquareCard
                      rank={1}
                      title="매콤달콤 특제 떡볶이"
                      likes={124}
                      views={1420}
                      shares={45}
                      onClick={() => alert('1등 레시피 클릭!')}
                    />

                    {/* 2등 카드: 2nd-badge.svg 확인 */}
                    <SquareCard
                      rank={2}
                      title="초코 가득 퐁당 쇼콜라"
                      likes={98}
                      views={890}
                      shares={22}
                    />

                    {/* 3등 카드 & 말줄임 테스트: 제목이 억수로 길 때 ...으로 잘 잘리는지 확인 */}
                    <SquareCard
                      rank={3}
                      title="우주에서 제일 맛있는 대존맛 안먹으면 후회하는 마라 로제 파스타 꿀조합 레시피"
                      likes={56}
                      views={412}
                      shares={12}
                    />

                    {/* 일반 카드: 왕관이 아예 없을 때 레이아웃 무너지지 않는지 확인 */}
                    <SquareCard title="시원한 아이스 아메리카노" likes={12} views={98} shares={3} />
                  </div>
                </div>
              </div>
              
              <section className="flex justify-end mt-4">
                <Dropdown options={['전체', '인기순', '최신순']} value={sort} onChange={setSort} />
              </section>

              <div className="mt-6 border-t border-slate-100 pt-6">
                <p className="text-center text-xs font-medium text-slate-400">
                  Taste Pioneers UI v1.0.0 완료
                </p>
              </div>
            </main>
          </div>
        } 
      />

    </Routes>
  )
}

export default App