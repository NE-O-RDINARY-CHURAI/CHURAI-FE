import { useParams } from 'react-router-dom'

export default function BoardEditPage() {
  const { id } = useParams()
  return <div>게시글 수정 - {id}</div>
}
