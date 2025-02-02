const Filter = ({ searchTerm, setSearchTerm, onSubmitSearch }) => {
  return (
    <>
      search phonebook : <input id="search-input" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} />
      <button id="search-button" onClick={onSubmitSearch}>Search Item </button>
    </>
  )
}

export default Filter
