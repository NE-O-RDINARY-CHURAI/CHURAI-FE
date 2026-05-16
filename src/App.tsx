import { useState } from 'react';
import Button from './components/button/Button';
import Tag from './components/tag/Tag';
import SelectBox from './components/selectbox/SelectBox'; 
import SquareCard from './components/card/SquareCard'; // 🌟 새롭게 이름 지은 스퀘어 카드 불러오기

function App() {
  const [category, setCategory] = useState<'MEAL' | 'DESSERT' | ''>('');
  const [tags, setTags] = useState<string[]>(['민트초코', '개척레시피', '해커톤']);

  const handleTagDelete = (targetTag: string) => {
    setTags(tags.filter((tag) => tag !== targetTag));
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      {/* 테스트 화면 가독성을 위해 기존 max-w-md에서 max-w-5xl(넓은 화면)로 변경했습니다 */}
      <main className="mx-auto min-h-[90vh] max-w-5xl rounded-3xl bg-white p-8 shadow-lg">
        <header className="mb-8 border-b border-slate-100 pb-4">
          <p className="text-sm font-semibold text-main">Taste Pioneers UI KIT</p>
          <h1 className="mt-1 text-2xl font-bold text-black">공통 UI 컴포넌트 최종 검증</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 왼쪽 영역: 기존 컨트롤 테스트 (SelectBox, Tag, Button) */}
          <div className="space-y-6 md:col-span-1">
            <section className="rounded-2xl bg-gray1 p-4 space-y-2">
              <h2 className="caption2-medium text-gray3 uppercase tracking-wider">SelectBox Test</h2>
              <SelectBox label="카테고리 설정" value={category} onChange={(val) => setCategory(val)} />
            </section>

            <section className="rounded-2xl bg-gray1 p-4 space-y-3">
              <h2 className="caption2-medium text-gray3 uppercase tracking-wider">Tag Test</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Tag key={tag} variant="default" onDelete={() => handleTagDelete(tag)}>{tag}</Tag>
                ))}
              </div>
            </section>

            <section className="rounded-2xl bg-gray1 p-4 space-y-3">
              <h2 className="caption2-medium text-gray3 uppercase tracking-wider">Button Hover Test</h2>
              <Button variant="primary" width="full">레시피 개척하기</Button>
              <div className="flex space-x-2">
                <Button variant="secondary" className="flex-1">인정해요 👍</Button>
                <Button variant="tertiary" className="flex-1">뒤로가기</Button>
              </div>
            </section>
          </div>

          {/* 오른쪽 영역: 🌟 새롭게 구현한 SquareCard 검증 구역 (2컬럼 차지) */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="caption2-medium text-gray3 uppercase tracking-wider px-2">SquareCard Test (왕관 & 말줄임 검증)</h2>
            
            {/* 카드를 이쁘게 가로로 배치하기 위해 flex 랩핑 */}
            <div className="flex flex-wrap gap-6 justify-start p-2">
              
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
              <SquareCard
                title="시원한 아이스 아메리카노"
                likes={12}
                views={98}
                shares={3}
              />

            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-100 mt-8">
          <p className="text-center caption2-medium text-gray3">Taste Pioneers UI v1.0.0 완료</p>
        </div>
      </main>
    </div>
  );
}

export default App;