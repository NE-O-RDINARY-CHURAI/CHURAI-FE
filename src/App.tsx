function App() {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <main className="mx-auto flex min-h-[90vh] max-w-md flex-col rounded-3xl bg-white p-6 shadow-lg">
        <header className="mb-8">
          <p className="text-sm font-semibold text-blue-500">NDHT 0516</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">해커톤 프론트 세팅 완료</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            React + TypeScript + Vite + Tailwind CSS가 정상 적용되는지 확인하는 기본 화면입니다.
          </p>
        </header>

        <section className="rounded-2xl bg-slate-50 p-4">
          <h2 className="text-lg font-bold text-slate-800">현재 세팅</h2>

          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>✅ React 프로젝트 생성 완료</li>
            <li>✅ TypeScript 적용</li>
            <li>✅ Tailwind CSS 적용 확인</li>
            <li>✅ 모바일 웹앱 형태 기본 레이아웃</li>
          </ul>
        </section>

        <button className="mt-auto rounded-2xl bg-blue-500 px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-600">
          시작하기
        </button>
      </main>
    </div>
  );
}

export default App;
