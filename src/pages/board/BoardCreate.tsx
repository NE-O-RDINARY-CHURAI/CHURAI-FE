import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// 🌟 boardApi에서 실제로 존재하는 createPost만 깔끔하게 가져와 임포트 에러를 해결합니다!
import { createPost } from '../../apis/board/boardApi'

import Button from '../../components/button/Button'
import SelectBox from '../../components/selectbox/SelectBox'
import Tag from '../../components/tag/Tag'

export default function BoardCreate() {
  const navigate = useNavigate()

  // 백엔드 명세서 매칭 상태 관리
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [category, setCategory] = useState<'MEAL' | 'DESSERT' | ''>('')
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 이미지 핸들러: 현재 백엔드에 업로드 API가 없으므로 브라우저 가상 로컬 URL(Blob)로 우회해 UI를 검증합니다!
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (imageUrls.length + files.length > 10) {
      alert('이미지는 최대 10장까지만 업로드할 수 있습니다.')
      return
    }

    // 🌟 파일당 10MB 크기 가드 유지
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 10 * 1024 * 1024) {
        alert(`${files[i].name} 파일이 10MB를 초과합니다.`)
        return
      }
    }

    // 🌟 로컬 브라우저 메모리에 임시로 사진 주소를 생성해 프리뷰 UI를 띄워줍니다.
    const localBlobUrls = Array.from(files).map(file => URL.createObjectURL(file))
    setImageUrls([...imageUrls, ...localBlobUrls])
  }

  // 이미지 프리뷰 칩 삭제
  const handleImageDelete = (indexToRemove: number) => {
    setImageUrls(imageUrls.filter((_, index) => index !== indexToRemove))
  }

  // 태그 입력 처리 핸들러
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput('')
    }
  }

  // 태그 삭제 핸들러
  const handleTagDelete = (targetTag: string) => {
    setTags(tags.filter(tag => tag !== targetTag))
  }

  // 필수 폼 입력 유효성 체크
  const isFormValid =
    category !== '' &&
    title.trim() !== '' &&
    contents.trim() !== '' &&
    nickname.trim() !== '' &&
    password.trim() !== ''

  // 폼 최종 제출 로직
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid || isSubmitting) return

    try {
      setIsSubmitting(true)

      // 📡 Swagger 진짜 엔드포인트 규격에 맞춰 서버로 게시글 데이터를 전송합니다!
      const data = await createPost({
        title,
        contents,
        nickname,
        password,
        category,
        imageUrls, // 현재는 로컬 가상 주소 배열이 날아가며, 백엔드에서 이미지 파트 준비 시 CDN으로 치환하면 됩니다.
        tags,
      })

      alert('레시피 게시글이 영롱하게 개척되었습니다! 🚀')

      // 리턴받은 실제 postId를 주소창에 달고 상세조회 페이지로 스무스하게 이동!
      navigate(`/boardDetail/${data.id}`)
    } catch (error) {
      console.error('게시글 작성 실패:', error)
      alert('게시글 등록에 실패했습니다. 데이터를 확인해 주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen justify-center bg-white px-4 py-10">
      <form onSubmit={handleSubmit} className="flex w-full max-w-[600px] flex-col">
        <header className="border-gray1 mb-8 border-b pb-4">
          <p className="caption1-medium text-main tracking-wider uppercase">Taste Pioneers</p>
          <h1 className="mt-1 text-2xl font-bold text-black">새로운 레시피 개척하기</h1>
        </header>

        <div className="flex flex-1 flex-col gap-6">
          {/* 작성자 정보 구역 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="body2-medium text-black">닉네임</label>
              <input
                type="text"
                placeholder="후라이마스터"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                className="border-gray2 focus:border-main placeholder:text-gray3 h-11 w-full rounded-xl border px-4 text-sm transition-colors focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="body2-medium text-black">비밀번호</label>
              <input
                type="password"
                placeholder="글 수정/삭제용 4자리"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border-gray2 focus:border-main placeholder:text-gray3 h-11 w-full rounded-xl border px-4 text-sm transition-colors focus:outline-none"
              />
            </div>
          </div>

          {/* 카테고리 선택 */}
          <div className="flex flex-col gap-2">
            <label className="body2-medium text-black">카테고리</label>
            <SelectBox
              label="레시피 종류를 골라주세요"
              value={category}
              onChange={val => setCategory(val as 'MEAL' | 'DESSERT')}
            />
          </div>

          {/* 제목 입력 */}
          <div className="flex flex-col gap-2">
            <label className="body2-medium text-black">레시피 이름</label>
            <input
              type="text"
              placeholder="맛깔나는 레시피 제목을 입력하세요"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="border-gray2 focus:border-main placeholder:text-gray3 h-11 w-full rounded-xl border px-4 text-sm transition-colors focus:outline-none"
            />
          </div>

          {/* 이미지 다중 업로드 파트 (로컬 가상 미러링 구동) */}
          <div className="flex flex-col gap-2">
            <label className="body2-medium text-black">
              레시피 사진 등록 <span className="text-gray3 text-xs">({imageUrls.length}/10)</span>
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="border-gray2 text-gray3 hover:border-main hover:text-main flex h-20 w-20 flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors"
              >
                <span className="text-xl">+</span>
                <span className="text-xs">사진 추가</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                multiple
                accept="image/jpg, image/jpeg, image/png, image/webp"
                className="hidden"
              />

              {/* 가상 주소 기반 이미지 프리뷰 스택 렌더링 */}
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="border-gray2 group relative h-20 w-20 overflow-hidden rounded-xl border"
                >
                  <img src={url} alt="레시피 미리보기" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleImageDelete(index)}
                    className="bg-opacity-40 absolute inset-0 flex items-center justify-center bg-black text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 본문 내용 입력 */}
          <div className="flex flex-col gap-2">
            <label className="body2-medium text-black">상세 조리법 및 꿀팁</label>
            <textarea
              rows={8}
              placeholder="나만의 특별한 재료 배합 등 노하우를 전수해 주세요."
              value={contents}
              onChange={e => setContents(e.target.value)}
              className="border-gray2 focus:border-main placeholder:text-gray3 w-full resize-none rounded-xl border p-4 text-sm leading-relaxed transition-colors focus:outline-none"
            />
          </div>

          {/* 태그 입력 */}
          <div className="flex flex-col gap-2">
            <label className="body2-medium text-black">태그 설정</label>
            <input
              type="text"
              placeholder="태그를 입력하고 Enter를 누르세요"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="border-gray2 focus:border-main placeholder:text-gray3 h-11 w-full rounded-xl border px-4 text-sm transition-colors focus:outline-none"
            />
            {tags.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Tag key={tag} variant="default" onDelete={() => handleTagDelete(tag)}>
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 액션 푸터 구역 */}
        <footer className="border-gray1 mt-10 flex gap-3 border-t pt-4">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={() => window.history.back()}
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="primary"
            isActive={isFormValid && !isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? '개척 중... ⏳' : '개척 완료 🚀'}
          </Button>
        </footer>
      </form>
    </div>
  )
}
