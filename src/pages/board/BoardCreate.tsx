import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost, uploadImages } from '../../apis/board/boardApi'; 

import Button from '../../components/button/Button';
import SelectBox from '../../components/selectbox/SelectBox';
import Tag from '../../components/tag/Tag';

export default function BoardCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState<'MEAL' | 'DESSERT' | ''>('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (imageUrls.length + files.length > 3) {
      alert('이미지는 최대 3장까지만 업로드할 수 있습니다.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 10 * 1024 * 1024) {
        alert(`${files[i].name} 파일이 10MB를 초과합니다.`);
        return;
      }
      formData.append('file', files[i]);
    }

    try {
      const data = await uploadImages(formData);
      setImageUrls([...imageUrls, ...data.imageUrls]);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드 중 문제가 발생했습니다.');
    }
  };

  const handleImageDelete = (indexToRemove: number) => {
    setImageUrls(imageUrls.filter((_, index) => index !== indexToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleTagDelete = (targetTag: string) => {
    setTags(tags.filter((tag) => tag !== targetTag));
  };

  const isFormValid =
    category !== '' && 
    title.trim() !== '' && 
    contents.trim() !== '' && 
    nickname.trim() !== '' && 
    password.trim() !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      
      const data = await createPost({
        title,
        contents,
        nickname,
        password,
        category,
        imageUrls,
        tags
      });

      alert('레시피 게시글이 등록되었습니다!');
      navigate(`/boardDetail/${data.postId}`); 
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      alert('게시글 등록에 실패했습니다. 데이터를 확인해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-[600px] flex flex-col">
        
        <header className="mb-8 border-b border-gray1 pb-4">
          <p className="caption1-medium text-main uppercase tracking-wider">Taste Pioneers</p>
          <h1 className="text-2xl font-bold text-black mt-1">새로운 레시피 개척하기</h1>
        </header>

        <div className="flex flex-col gap-6 flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="body2-medium text-black">닉네임</label>
              <input
                type="text"
                placeholder="후라이마스터"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full h-11 px-4 border border-gray2 rounded-xl text-sm focus:outline-none focus:border-main placeholder:text-gray3 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="body2-medium text-black">비밀번호</label>
              <input
                type="password"
                placeholder="글 수정/삭제용 4자리"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-4 border border-gray2 rounded-xl text-sm focus:outline-none focus:border-main placeholder:text-gray3 transition-colors"
              />
            </div>
          </div>

          {/* 카테고리 선택 */}
          <div className="flex flex-col gap-2">
            <label className="body2-medium text-black">카테고리</label>
            <SelectBox 
              label="레시피 종류를 골라주세요" 
              value={category} 
              onChange={(val) => setCategory(val as 'MEAL' | 'DESSERT')} 
            />
          </div>

          {/* 제목 입력 */}
          <div className="flex flex-col gap-2">
            <label className="body2-medium text-black">레시피 이름</label>
            <input
              type="text"
              placeholder="맛깔나는 레시피 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 px-4 border border-gray2 rounded-xl text-sm focus:outline-none focus:border-main placeholder:text-gray3 transition-colors"
            />
          </div>

          {/* 이미지 다중 업로드 파트 */}
          <div className="flex flex-col gap-2">
            <label className="body2-medium text-black">
              레시피 사진 등록 <span className="text-xs text-gray3">({imageUrls.length}/3)</span>
            </label>
            <div className="flex flex-wrap gap-3 items-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 border-2 border-dashed border-gray2 rounded-xl flex flex-col items-center justify-center text-gray3 hover:border-main hover:text-main transition-colors"
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

              {/* 업로드 완료 프리뷰 스택 */}
              {imageUrls.map((url, index) => (
                <div key={index} className="relative w-20 h-20 border border-gray2 rounded-xl overflow-hidden group">
                  <img src={url} alt="레시피 미리보기" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleImageDelete(index)}
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
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
              onChange={(e) => setContents(e.target.value)}
              className="w-full p-4 border border-gray2 rounded-xl text-sm focus:outline-none focus:border-main resize-none leading-relaxed placeholder:text-gray3 transition-colors"
            />
          </div>

          {/* 태그 입력 */}
          <div className="flex flex-col gap-2">
            <label className="body2-medium text-black">태그 설정</label>
            <input
              type="text"
              placeholder="태그를 입력하고 Enter를 누르세요"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="w-full h-11 px-4 border border-gray2 rounded-xl text-sm focus:outline-none focus:border-main placeholder:text-gray3 transition-colors"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {tags.map((tag) => (
                  <Tag key={tag} variant="default" onDelete={() => handleTagDelete(tag)}>
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 액션 푸터 구역 */}
        <footer className="mt-10 pt-4 border-t border-gray1 flex gap-3">
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
            {isSubmitting ? '등록 중... ⏳' : '등록 완료'}
          </Button>
        </footer>

      </form>
    </div>
  );
}