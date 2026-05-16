import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-3 p-6">
      <button onClick={() => navigate('/board')} className="w-full rounded-lg bg-main py-3 text-white caption1-medium">게시판</button>
      <button onClick={() => navigate('/search')} className="w-full rounded-lg bg-main py-3 text-white caption1-medium">검색</button>
      <button onClick={() => navigate('/boardDetail/1')} className="w-full rounded-lg bg-main py-3 text-white caption1-medium">게시글 상세</button>
      <button onClick={() => navigate('/boardCreate')} className="w-full rounded-lg bg-main py-3 text-white caption1-medium">게시글 작성</button>
      <button onClick={() => navigate('/boardEdit/1')} className="w-full rounded-lg bg-main py-3 text-white caption1-medium">게시글 수정</button>
    </div>
  )
}
