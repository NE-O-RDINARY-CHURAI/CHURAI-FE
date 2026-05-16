import SearchButton from '../../components/button/SearchButton'

export default function BoardPage() {
  return (
    <div>
      <header className="flex items-center justify-end px-4 h-14 bg-gray1">
        <SearchButton />
      </header>
      <main>게시판</main>
    </div>
  )
}
