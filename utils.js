


// LIBRARY HAS BOOKS
// -----------------------
// 
// Check if localStorage.bookstack exists and if it has any books, return true or false
//
// -----------------------

export function libraryHasBooks(library=false) {

    // Check if bookstack is set in local storage
    if ( !localStorage.getItem('bookstack') ) return false

    // Check if bookstack is set in local storage but no books exist
    if ( Object.keys(
        JSON.parse(
            localStorage.bookstack
            )
        ).length === 0
    ) return false

    //Check if local storage exists but library state is false (search results)
    if (library && library.length === 0) return false 
    
    // Books exist in local storage
    return true
}




// GET BOOKS
// -----------------------
// 
// Get books from local storage and return as array of objects
//
// -----------------------

export function getBooks() {

    if (!libraryHasBooks) return

    let library = Object.entries(
        JSON.parse(
            localStorage.getItem('bookstack')
        )
    )

    return library

}



// CHECK USER SETTINGS
// -----------------------
// 
// Make sure user settings are set in local storage before page render. If not, store default values
//
// -----------------------

export function checkUserSettings() {

    if(!localStorage.bookstack) {
        const emptyLibrary = JSON.stringify({})
        localStorage.setItem('bookstack', emptyLibrary)
    }

    if(!localStorage.readFilter) {
        localStorage.setItem('readFilter', 'all')
    }
    
    if(!localStorage.sortMethod) {
        localStorage.setItem('sortMethod', 'title')
    }

    if(!localStorage.viewMethod) {
        localStorage.setItem('viewMethod', 'grid')
    }

}




// GET GOOGLE BOOK INFO
// -----------------------
// 
// Take ISBN value and get associated google book info. Called from addBook()
//
// -----------------------

export async function getGoogleBookInfo(isbn) {
    try {
        const google = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=AIzaSyDMCCAwAVRo5YHS07hVrUDtBCzx1VPEcTo`)
        
        const data = await google.json()
        
        return data.items[0].volumeInfo
        // return data
    } catch(err) {
        return false
    }

}



// ADD BOOK
// -----------------------
// 
// Gather data from form, generate id's, get book info from Google Books API, add to local storage
//
// -----------------------


export async function addBook() {

    let event = window.event
    event.preventDefault()

    console.log(event.target[0].value)

    const isbn = event.target[0].value
    const read = (event.target[1].value === "true") ? true : false
    const id = Math.random().toString(16).slice(2)
    const date = new Date().valueOf()

    const book = await getGoogleBookInfo(isbn)

        if(!book) {
        return 'error'
    }

    event.target[0].value = ''
    
    let imgLink
    try {
        imgLink = book.imageLinks.thumbnail
    } catch(error) {
        imgLink = '#'
    }

    const newBook = {
            title : book.title,
            author : book.authors[0],
            pages : book.pageCount,
            image : imgLink,
            isbn : isbn,
            read,
            date
    }
     
    
    let library = {}
    
    if (libraryHasBooks())  library = JSON.parse(localStorage.bookstack)

    library[id] = newBook

    localStorage.setItem('bookstack', JSON.stringify(library))

    const newBookData = {
        id : id,
        title : book.title
    }

    return newBookData
}





// DELETE BOOK  
// -----------------------
// 
// Delete book with passed in ID in local storage
//
// -----------------------

export function deleteBook(id) {

        let library = JSON.parse(localStorage.bookstack)

        delete library[id]

        localStorage.setItem('bookstack', JSON.stringify(library))
}




// SEARCH BOOKS
// -----------------------
// 
// Search through localstorage and return books containing a phrase
//
// -----------------------

export function searchBooks(event) {

    const library = Object.entries(
        JSON.parse(localStorage.bookstack)
    )
    
    let query = event.target.value.toLowerCase()
    if (query.length === 0) return library


    if (library.length === 0) return library


    const searchResults = library.filter((book) => {

        let bookTitle = book[1].title.toLowerCase()
        let bookAuthor = book[1].author.toLowerCase()
      
        return ((bookTitle.includes(query)) || (bookAuthor.includes(query))) ? true : false
    })



    return searchResults
}




// APPLY USER OPTIONS
// -----------------------
// 
// Sort, Filter, and Organize Library before rendering in Library Component
//
// -----------------------


export function applyUserOptions(sortMethod, filter, library) {

    //Filter by Read Status if selected
    if (filter === true) {
        library = library.filter( (book) => {
            return book[1].read === true
        })
    }
    
    //Filter by Unread Status if selected
    if (filter === false) {
        library = library.filter( (book) => {
            return book[1].read === false
        })
    }


    switch(sortMethod) {

        case 'newToOld':
        case 'oldToNew':
            library.sort((a, b) => {
                if (a[1].date === b[1].date) {
                    return 0
                } else {
                    return (a[1].date < b[1].date) ? -1 : 1
                }
            })
            break;
        
        case 'title':
            library.sort((a, b) => {
                if (a[1].title.toLowerCase() === b[1].title.toLowerCase()) {
                    return 0
                } else {
                    return (a[1].title.toLowerCase() < b[1].title.toLowerCase()) ? -1 : 1
                }
            })
            break;
        
        case 'author':
            library.sort((a, b) => {
                if (a[1].author.toLowerCase() === b[1].author.toLowerCase()) {
                    return 0
                } else {
                    return (a[1].author.toLowerCase() < b[1].author.toLowerCase()) ? -1 : 1
                }
            })
            break;
        default:
    }

    
    if (sortMethod === 'newToOld') {
        library.reverse()
    }


    return library
    
}




// DEV FUNCTIONS
// -----------------------
// 
// Nothing to see here...
//
// -----------------------
