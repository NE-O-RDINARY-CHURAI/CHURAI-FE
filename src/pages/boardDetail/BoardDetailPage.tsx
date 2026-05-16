import { useParams } from 'react-router-dom'

export default function BoardDetailPage() {
  const { id } = useParams()
  return <div>게시글 상세 - {id}</div>
}
