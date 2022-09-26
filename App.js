
import { useState, useMemo } from 'react';
import debounce from 'lodash.debounce'
import { checkUserSettings, applyUserOptions, addBook, searchBooks, libraryHasBooks } from './js/utils.js'

import Book from './js/Book'
import BookInfo from './js/BookInfo'
import AddBookMsg from './js/AddBookMsg'
import LibraryEmptyMsg from './js/LibraryEmptyMsg';


import './css/App.css';
import * as IMG from './img'


function App() {

  // ---------- ---------- ---------- ----------
  //App Setup
  // ---------- ---------- ---------- ----------

  document.title = 'BookStack Web App'
  
  checkUserSettings()



  // ---------- ---------- ---------- ----------
  //State Setup
  // ---------- ---------- ---------- ----------




  const [viewMethod, setViewMethod] = useState(localStorage.viewMethod)  
  function toggleViewMethod(method) { 
    setViewMethod(method)
    localStorage.setItem('viewMethod', method)
  }


  const [sortMethod, setSortMethod] = useState(localStorage.sortMethod)
  function toggleSortMethod(method) { 
    setSortMethod(method) 
    localStorage.setItem('sortMethod', method)
  }
  
 
 
  let readStatus = 'all'
  if (localStorage.readFilter === 'true') readStatus = true
  if (localStorage.readFilter === 'false') readStatus = false

  const [readFilter, setReadFilter] = useState(readStatus)
  function toggleReadFilter(filter) { 
    setReadFilter(filter) 
    localStorage.setItem('readFilter', filter)
  }



  const [popupBook, setPopupBook] = useState(false) 
  const [currentPopupBook, setCurrentPopupBook] = useState(false) 


  const [newBookAdded, setNewBookAdded] = useState(false)


  

  const getLocalStorageBookStack = Object.entries(
    JSON.parse(localStorage.bookstack)
  )

  let [library, setLibrary] = useState(getLocalStorageBookStack)
  library = applyUserOptions(sortMethod, readFilter, library)


  let totalPages = 0

  library.forEach( (book) => {
        totalPages += book[1].pages
  } )
  

  // ---------- ---------- ---------- ----------
  //App main functions
  // ---------- ---------- ---------- ----------

  async function handleAddBook() {

    const newBookData = await addBook()

    const updatedLibrary =  Object.entries(
        JSON.parse(localStorage.bookstack)
    )

    setLibrary( updatedLibrary )
    
    setNewBookAdded(newBookData)

    setTimeout( () => {
        setNewBookAdded(false)
    }, 5000)

}




function handleSearch(event) {
    const searchResults = searchBooks(event, library)
    
    setLibrary(searchResults)
}


const debounceHandleSearch = useMemo(
    //eslint-disable-next-line
    () => debounce(handleSearch, 500), []
)









  return (
    <>


    <nav className="container">
          
        <div className="nav-sort">
            <div className="nav-content">

                <div className="logo">
                    <img src={IMG.logo} alt="Logo" /> 
                </div>

                <div className="title">
                    <h1>BookStack</h1>
                </div>

                <div className='nav-section'>

                    <button>
                        View: { viewMethod }
                    </button>

                    <div className='nav-section-group view-group'>

                        <button className='action-button' onClick={ () => toggleViewMethod('grid')} >
                            <img src={IMG.gridIcon} alt="Grid" /> Grid
                        </button>

                        <button className='action-button' onClick={ () => toggleViewMethod('table')} >
                            <img src={IMG.tableIcon} alt="Table" /> Table
                        </button>

                    </div>

                </div>

                <div className='nav-section'>

                    <button>
                        Sort: {sortMethod}
                    </button>

                    <div className='nav-section-group sort-group'>
                        
                        <button className='action-button' onClick={ () => toggleSortMethod('author')}>
                            <img src={IMG.authorIcon} alt="Author" /> Author
                        </button>

                        <button className='action-button' onClick={ () => toggleSortMethod('title')}>
                            <img src={IMG.titleIcon} alt="Title" /> Title
                        </button>

                        <button className='action-button' onClick={ () => toggleSortMethod('newToOld')}>
                            <img src={IMG.newtoOldIcon} alt="New to  Old" /> Newest to Oldest
                        </button>

                        <button className='action-button' onClick={ () => toggleSortMethod('oldToNew')}>
                            <img src={IMG.oldtonewIcon} alt="" /> Oldest to Newest
                        </button>
                    </div>
                </div>

                <div className='nav-section'>

                    <button>
                        Filter: 
                        { readFilter === 'all' && ' All' }
                        { readFilter === true && ' Read' }
                        { readFilter === false && ' Unread' }
                    </button>

                    <div className='nav-section-group filter-group'>

                        <button className='action-button' onClick={ () => toggleReadFilter('all') }>
                            <img src={IMG.allIcon} alt="All" /> All
                        </button>
                        
                        <button className='action-button' onClick={ () => toggleReadFilter(true) }>
                            <img src={IMG.readIcon} alt="Read" /> Read Books
                        </button>

                        <button className='action-button' onClick={ () => toggleReadFilter(false) }>
                            <img src={IMG.unreadIcon} alt="Unread" /> Unread Books
                        </button>
                    </div>

                </div>
            </div>

        </div>

        <div className="nav-actions">


            <form onSubmit={ handleAddBook } >

                <div className='nav-actions-item'>
                    <label>
                        Book ISBN: &nbsp;
                        <input type="text" name="newbook" />
                    </label>
                    <label>
                        Read? &nbsp;
                        <select>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </label>

                    <button type="submit" value="Add Book">
                        <img src={IMG.addIcon} alt="Add" />
                    </button>
                </div>

            </form>


            <div className='nav-actions-item'>
                <input type="text" className="search-input" onChange={ debounceHandleSearch } />
                <button>
                    <img src={IMG.searchIcon} alt="Search" />
                </button>

            </div>
        </div>
    </nav>





 
    {/* If Library is empty, Display Library Empty Message. Else display library */}

    { !libraryHasBooks(library) && <LibraryEmptyMsg /> }


    { libraryHasBooks(library) &&

        <>

        { viewMethod === 'grid' && 
        
            <div className='library-grid container'>
                { library.map( (book, index) => (
                    <Book
                        bookData={ book }

                        key={ index }
                        display={ viewMethod }
                        readStatus={  ( book[1].read === true ) ? 'Yes' : 'No' }

                        setLibrary={ setLibrary }
                        setPopupBook={ setPopupBook }
                        setCurrentPopupBook={ setCurrentPopupBook }
                    />
                )) } 
            </div>
        }
        


        { viewMethod === 'table' &&
        
            <table className='library-table container'>
                <thead>
                    <tr>
                        <td>Cover</td>
                        <td>Title</td>
                        <td>Author</td>
                        <td>Pages</td>
                        <td>Read?</td>
                        <td>User Actions</td>
                    </tr>
                </thead>

                <tbody>
                    { library.map( (book, index) => (
                        <Book
                            bookData={ book }

                            key={ index }
                            display={ viewMethod }
                            readStatus={  ( book[1].read === true ) ? 'Yes' : 'No' }

                            setLibrary={ setLibrary }
                            setPopupBook={ setPopupBook }
                            setCurrentPopupBook={ setCurrentPopupBook }
                        />
                    )) } 

                </tbody>

            </table>

            }
        </>
        
    }
    

    






    <footer className='container'>
        You have { totalPages } total pages in your library<br />
        Made By Josh =) with React
    </footer>






    {/* Messages */}



    

    {/* More Info Popup */}

    { currentPopupBook &&

    <BookInfo 
        popupBook={ popupBook }
        setPopupBook={ setPopupBook }
        currentPopupBook={ currentPopupBook }
        setCurrentPopupBook={ setCurrentPopupBook }
      />

       
    }





   {/* If New Book was Added, Display temp success/fail message  */}

   { newBookAdded &&  
        <AddBookMsg 
            newBookAdded={ newBookAdded } 
            setNewBookAdded={ setNewBookAdded } 
        />
    }
      





    </>
  );
}

export default App;
