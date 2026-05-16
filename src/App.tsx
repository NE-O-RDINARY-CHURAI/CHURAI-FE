import { useState } from 'react'
import Button from './components/button/Button'
import Tag from './components/tag/Tag'
import SelectBox from './components/selectbox/SelectBox'
import Dropdown from './components/dropdown/Dropdown'

function App() {
  const [category, setCategory] = useState<'MEAL' | 'DESSERT' | ''>('')
  const [tags, setTags] = useState<string[]>(['민트초코', '개척레시피', '해커톤'])
  const [sort, setSort] = useState('전체')

  const handleTagDelete = (targetTag: string) => {
    setTags(tags.filter(tag => tag !== targetTag))
  }

  return (
    <div className="bg-slate-100 px-4 py-6">
      <main className="">
        <header className="mb-6">
          <p className="text-sm font-semibold text-orange-500">Taste Pioneers UI KIT</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">재범 파트 최종 확인 화면</h1>
        </header>

        <div className="flex-1 space-y-6">
          {/* 1. 카테고리 설정 셀렉트 박스 구역 */}
          <section className="space-y-2 rounded-2xl bg-slate-50 p-4">
            <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              SelectBox Test
            </h2>
            <SelectBox label="카테고리 설정" value={category} onChange={val => setCategory(val)} />
          </section>

          {/* 2. 태그 컴포넌트 구역 */}
          <section className="space-y-3 rounded-2xl bg-slate-50 p-4">
            <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Tag Test</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Tag key={tag} variant="default" onDelete={() => handleTagDelete(tag)}>
                  {tag}
                </Tag>
              ))}
            </div>
          </section>

          {/* 3. 버튼 마우스 호버 반응 확인 구역 */}
          <section className="space-y-3 rounded-2xl bg-slate-50 p-4">
            <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
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

        <section className="flex justify-end">
          <Dropdown options={['전체', '인기순', '최신순']} value={sort} onChange={setSort} />
        </section>

        <div className="mt-6 border-t border-slate-100 pt-6">
          <p className="text-center text-xs font-medium text-slate-400">
            Taste Pioneers UI v1.0.0 완료
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
