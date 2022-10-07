// TODO
// make table view mobile responsive


// Dependencies
import { useState, useEffect } from 'react';
import { 
    applyUserOptions, 
    checkUserSettings,
    getLibrary,
    updateLibrary,
    getViewMethod,
    updateViewMethod, 
    getSortMethod,
    updateSortMethod,
    getReadFilter,
    updateReadFilter
} from './js/utils.js'

// Components
import NavBar from './js/NavBar'
import Logo from './js/Logo'
import Menu from './js/Menu.js';
import UserSettings from './js/UserSettings.js';
import AddBookForm from './js/AddBookForm.js';
import SearchForm from './js/SearchForm.js';
import Book from './js/Book'
import BookInfoModal from './js/BookInfoModal'
import AddBookMsg from './js/AddBookMsg'
import LibraryEmptyMsg from './js/LibraryEmptyMsg';
import NoBooksFoundMsg from './js/NoBooksFoundMsg'

// CSS/Media
import './css/App.css';





function App() {

  // ---------- ---------- ---------- ----------
  // Initialize App
  // - Set Document Title 
  // - Check LocalStorage if library/settings are set
  // ---------- ---------- ---------- ----------

  useEffect( () => {
      document.title = 'BookStack Web App'
  }, [])
  
  checkUserSettings()



  // Stores Active Menu Item
  const [activeMenuItem, setActiveMenuItem] = useState(false) // String or False (settings, add, search, false)



  // Stores Method of viewing book library 
  const [viewMethod, setViewMethod] = useState( getViewMethod() )  // String (table, grid)
  // -Update Localstorage on change
   useEffect( () => {
    updateViewMethod(viewMethod)
   }, [viewMethod])



  // Stores method of Sorting book Library
  const [sortMethod, setSortMethod] = useState( getSortMethod() ) // String (title, author, newToOld, oldToNew)
  
  // -Update Localstorage on change
  useEffect( () => {
    updateSortMethod(sortMethod)
  }, [sortMethod])

 

  // Stores method of Filtering book library 
  const [readFilter, setReadFilter] = useState( getReadFilter() ) // String (all, read, unread)
  
  // - Update Localstorage on change
  useEffect( () => {
    updateReadFilter(readFilter)
  })



  // Stores search Results
  const [searchResults, setSearchResults] = useState(false)



  // Stores ISBN of current book in Book Info Modal
  const [bookInfoModalISBN, setBookInfoModalISBN] = useState(false) // Number OR False (isbn, false)



  // Stores Book Data from google books API
  const [bookInfoModalData, setBookInfoModalData] = useState(false) // Object OR False



  // If a new Book was recently added, store Book Data, Else store false
  const [newBookAdded, setNewBookAdded] = useState(false) // Object OR False

 

  // - Stores list of all books and data in library
  // * Interacts with Local Storage, not UI
  // * We do not want UI changes (filter/sort) to update Local Storage!
  const [library, setLibrary] = useState( getLibrary() ) // Array of Objects

  // Update local storage on change
  useEffect( () => {
    updateLibrary(library)
  }, [library])


  
  // - Stores all books and data in library and is sort/filter-able
  // * Interacts with UI, not Local Storage
  // * We do not want UI changes (filter/sort) to update Local Storage!
  const [uILibrary, setUILibrary] = useState( getLibrary() ) // Array of Objects
  
  // - Update UI when Library is sorted/filtered/searched
  useEffect( () => {
    let updatedLibrary

    if (searchResults) {
        updatedLibrary = searchResults
    } else {
        updatedLibrary = getLibrary()
        updatedLibrary = applyUserOptions(updatedLibrary, readFilter, sortMethod)
    }

    setUILibrary(updatedLibrary)

  }, [readFilter, sortMethod, library, searchResults])



  // Counts total number of pages in the library, just for fun.
  let totalPagesInLibrary = 0 // Number
  library.forEach( book => totalPagesInLibrary += book.pages )
  





  return (
    <>

    <NavBar>

        <Logo 
          key="Logo"
          title="BookStack" 
        />

        <Menu 
          activeMenuItem={ activeMenuItem }
          setActiveMenuItem={ setActiveMenuItem }  
          setSearchResults={ setSearchResults }
        />

    </NavBar>

    <div className='position-relative'>

    { 
    activeMenuItem === 'settings' &&
        <UserSettings 
            viewMethod={ viewMethod }
            sortMethod={ sortMethod }
            readFilter={ readFilter }
            setViewMethod={ setViewMethod }
            setSortMethod={ setSortMethod }
            setReadFilter={ setReadFilter }
            setActiveMenuItem={ setActiveMenuItem }
            />
    }

        
    { 
    activeMenuItem === 'add' &&
        <AddBookForm 
            library={ library }
            setLibrary={ setLibrary }
            setNewBookAdded={ setNewBookAdded }
            setActiveMenuItem={ setActiveMenuItem }
        />
    }


    { 
    activeMenuItem === 'search' &&
        <SearchForm 
            library={ library }
            setSearchResults={ setSearchResults }
            setActiveMenuItem={ setActiveMenuItem }
        />
    }

    </div>


 
    {/* If Local Storage Library is empty, Display Library Empty Message. */}

    { 
    library.length === 0 && <LibraryEmptyMsg /> 
    }


    {/* If UI Local Storage is Empty, Display No Books Found Message */}

    {
    (uILibrary.length === 0) && (library.length !== 0) && <NoBooksFoundMsg />
    }

    { 
    uILibrary &&

        <>
        { viewMethod === 'grid' && 
        
            <div className='library-grid container'>
                { uILibrary.map( (book, index) => (
                    <Book
                        bookData={ book }

                        key={ index }
                        display={ viewMethod }

                        library={ library }
                        setLibrary={ setLibrary }
                        setBookInfoModalISBN={ setBookInfoModalISBN }
                        setBookInfoModalData={ setBookInfoModalData }
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
                    { uILibrary.map( (book, index) => (
                        <Book
                            bookData={ book }

                            key={ index }
                            display={ viewMethod }
                            readStatus={  ( book.read === 'read' ) ? 'Yes' : 'No' }

                            library={ library }
                            setLibrary={ setLibrary }
                            setBookInfoModalISBN={ setBookInfoModalISBN }
                            setBookInfoModalData={ setBookInfoModalData }
                        />
                    )) } 

                </tbody>

            </table>

            }
        </>
        
    }
    

    






    <footer className='container'>
        You have { totalPagesInLibrary } total pages in your library<br />
        Made By Josh =) with React
    </footer>






    {/* Messages */}



    

    {/* More Info Popup */}

    { bookInfoModalData &&

    <BookInfoModal 
        bookInfoModalISBN={ bookInfoModalISBN }
        setBookInfoModalISBN={ setBookInfoModalISBN }
        bookInfoModalData={ bookInfoModalData }
        setBookInfoModalData={ setBookInfoModalData }
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
