import './header.css'

export default function Header ({ search, setSearch }: HeaderProps): JSX.Element {
  console.log(setSearch, 'setSearch')
  return (
    <nav className="navbar navbar-light  fixed-top  bg-dark">
      <a className="navbar-brand text-white mx-3"> Market</a>
      <input className="search-input form-control shadow-none w-25" type="search" value={search != null ? search : ''} onChange={(e) => { setSearch(e.target.value) }} placeholder="Search" aria-label="Search" />
    </nav>
  )
}

interface HeaderProps {
  search: string | null
  setSearch: (value: string) => void

}
