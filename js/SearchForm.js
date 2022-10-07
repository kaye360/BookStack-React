
import { useMemo } from 'react'
import debounce from 'lodash.debounce'
import { searchBooks } from './utils'
import { menuCloseIcon } from '../img'

export default function SearchForm(props) {

  const { library, setSearchResults, setActiveMenuItem } = props

  const style = {
    display : 'flex',
    flexWrap : 'wrap',
    justifyContent : 'flex-end',
    alignItems : 'center',
    marginBottom : '1rem',
    padding : '1rem',
    backgroundColor : 'var(--clr-primary-light)',
    textAlign : 'right',
    animation : 'slide-down 500ms ease-in-out both',
  }
  
  const searchBarStyle = {
    minWidth : '300px',
    width : '100%',
    maxWidth : '400px',
    padding : '0.5rem 1rem',
  }


  // Handle and debounce search input
  function handleSearch(event) {
    const searchResults = searchBooks(event, library)

    setSearchResults(searchResults)
  }

  const debounceHandleSearch = useMemo( () => 
    //eslint-disable-next-line
    debounce(handleSearch, 500), []
  )


 
    return (
        <div style={ style } className="container">
            <button onClick={ () => setActiveMenuItem(false) } style={ {width : '100%', textAlign : 'right'} }>
              <img src={ menuCloseIcon } alt="Close Menu" />
            </button>

            <label>
                Search: 
              <input 
                type="text" 
                onChange={ debounceHandleSearch } 
                style={ searchBarStyle } />
            </label>

        </div>
    )
}