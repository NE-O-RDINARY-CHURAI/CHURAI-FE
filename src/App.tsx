import { useState } from 'react';
import Button from './components/button/Button';
import Tag from './components/tag/Tag';
import SelectBox from './components/selectbox/SelectBox'; 

function App() {
  const [category, setCategory] = useState<'MEAL' | 'DESSERT' | ''>('');
  
  const [tags, setTags] = useState<string[]>(['민트초코', '개척레시피', '해커톤']);

  const handleTagDelete = (targetTag: string) => {
    setTags(tags.filter((tag) => tag !== targetTag));
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <main className="mx-auto flex min-h-[90vh] max-w-md flex-col rounded-3xl bg-white p-6 shadow-lg">
        <header className="mb-6">
          <p className="text-sm font-semibold text-orange-500">Taste Pioneers UI KIT</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">재범 파트 최종 확인 화면</h1>
        </header>

        <div className="space-y-6 flex-1">
          <section className="rounded-2xl bg-slate-50 p-4 space-y-2">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              SelectBox Component Test (With arrow-down.svg)
            </h2>
            <SelectBox 
              label="카테고리 설정 (식사류/디저트류)" 
              value={category} 
              onChange={(val) => setCategory(val)} 
            />
            {category && (
              <p className="text-xs text-orange-600 mt-1 font-medium">
                선택된 값: <span className="underline">{category === 'MEAL' ? '식사류' : '디저트류'}</span>
              </p>
            )}
          </section>

          <section className="rounded-2xl bg-slate-50 p-4 space-y-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Tag Component Test
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag key={tag} variant="default" onDelete={() => handleTagDelete(tag)}>
                  {tag}
                </Tag>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-slate-50 p-4 space-y-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Button Component Test
            </h2>
            <Button variant="primary" className="w-full">
              레시피 개척하기 (Primary)
            </Button>
            <div className="flex space-x-2">
              <Button variant="secondary" className="flex-1">인정해요 👍 (Secondary)</Button>
              <Button variant="tertiary" className="flex-1">뒤로가기 (Tertiary)</Button>
            </div>
          </section>
        </div>

        <div className="pt-6 border-t border-slate-100 mt-6">
          <p className="text-center text-xs text-slate-400 font-medium">Taste Pioneers UI v1.0.0 완료</p>
        </div>
      </main>
    </div>
  );
}

export default App;