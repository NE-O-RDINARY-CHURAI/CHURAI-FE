import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { createPost } from '../../apis/board/boardApi';

import Button from '../../components/button/Button';
import Tag from '../../components/tag/Tag';

import BowlIcon from '../../assets/icons/boul.svg';
import SnackIcon from '../../assets/icons/snacks.svg';
import ImageIcon from '../../assets/icons/image.svg';

export default function BoardCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState<'MAIN_DISH' | 'DESSERT' | ''>('');
  // 백엔드로 전송할 실제 바이너리 File 객체 배열
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // 프리뷰용 가상 URL 배열

  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBackNavigation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const isConfirmed = window.confirm('정말 뒤로 가시겠습니까?');
    if (isConfirmed) {
      navigate(-1);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > 3) {
      alert('이미지는 최대 3장까지만 업로드할 수 있습니다.');
      return;
    }

    const fileArray = Array.from(files);

    const blobUrls = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...blobUrls]);
    setImages([...images, ...fileArray]);
    
  };

  const handleImageDelete = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
    setPreviewUrls
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
        images, 
        tags,
      });

      alert('게시글 작성이 완료되었습니다!');
      navigate(`/boardDetail/${data.id}`);
    } catch (error) {
      console.error(error);
      alert('게시글 작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="w-[360px] bg-white shadow-md overflow-hidden flex flex-col rounded-2xl"
      >
        <header className="w-full bg-[#FD4A12] py-5 px-[28px] flex justify-center items-center relative select-none">
          <h1 className="text-base font-bold text-white tracking-wide">
            레시피 작성
          </h1>

          <button
            type="button"
            onClick={handleBackNavigation}
            className="w-6 h-6 flex items-center justify-center text-white absolute right-[28px] hover:opacity-80 transition-opacity"
            aria-label="닫기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="p-6 flex flex-col gap-5 bg-white">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-700">레시피명*</label>
            <input
              type="text"
              placeholder="레시피명을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 px-3.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FD4A12] placeholder:text-gray-300 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-700">카테고리*</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCategory('MAIN_DISH')}
                className={`flex-1 h-9 rounded-full border text-xs flex items-center justify-center gap-1.5 transition-colors text-[#000000] ${
                  category === 'MAIN_DISH' ? 'border-[#FD4A12] bg-[#FD4A12]/10 font-black' : 'border-gray-200 bg-white font-semibold'
                }`}
              >
                <img src={BowlIcon} alt="주요 요리" className="w-4 h-4" />
                <span>주요 요리</span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('DESSERT')}
                className={`flex-1 h-9 rounded-full border text-xs flex items-center justify-center gap-1.5 transition-colors text-[#000000] ${
                  category === 'DESSERT' ? 'border-[#FD4A12] bg-[#FD4A12]/10 font-black' : 'border-gray-200 bg-white font-semibold'
                }`}
              >
                <img src={SnackIcon} alt="디저트" className="w-4 h-4" />
                <span>디저트</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-700">레시피 설명*</label>
            <textarea
              rows={5}
              placeholder={`Ex. 자유롭게 레시피를 작성해주세요!\n재료: 양파 1개, 고춧가루 50g\n만드는 방법:\n1.\n2.\n3.`}
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              className="w-full p-3.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FD4A12] resize-none leading-relaxed placeholder:text-gray-300 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap gap-2 items-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-10 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-xs text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <img src={ImageIcon} alt="사진" className="w-4 h-4" />
                <span>사진 업로드</span>
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                multiple
                accept="image/*"
                className="hidden"
              />

              {previewUrls.map((url, index) => (
                <div key={index} className="relative w-14 h-14 border border-gray-200 rounded-lg overflow-hidden group mt-1">
                  <img src={url} alt="미리보기" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleImageDelete(index)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-700">닉네임</label>
            <input
              type="text"
              placeholder="닉네임을 작성해주세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full h-11 px-3.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FD4A12] placeholder:text-gray-300 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-700">비밀번호*</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-3.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FD4A12] placeholder:text-gray-300 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-700">태그 설정</label>
            <input
              type="text"
              placeholder="태그를 입력하고 Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="w-full h-11 px-4 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FD4A12] placeholder:text-gray-300 transition-colors"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {tags.map((tag) => (
                  <Tag key={tag} variant="default" onDelete={() => handleTagDelete(tag)}>
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </div>

          <footer className="mt-2 flex gap-2">
            <Button
              type="button"
              variant="secondary"
              className="flex-1 h-10 text-xs text-[#000000] font-black"
              onClick={handleBackNavigation}
            >
              취소
            </Button>

            <Button
              type="submit"
              variant="primary"
              isActive={isFormValid && !isSubmitting}
              className={`flex-1 h-10 text-xs font-black transition-colors text-[#000000] ${
                isFormValid ? 'bg-[#FD4A12]' : 'bg-gray-200'
              }`}
            >
              {isSubmitting ? '등록 중...' : '작성 완료'}
            </Button>
          </footer>
        </div>
      </form>
    </div>
  );
}