// Library has books
// Check user settings
// apply user options
// Add Book
// Get Google Book Info
// Search Books



export function getLibrary() {
    return JSON.parse( localStorage.getItem('bookstack') )
}



export function updateLibrary(updatedLibrary) {
    localStorage.setItem('bookstack', JSON.stringify(updatedLibrary) )
}



export function getViewMethod() {
    return localStorage.getItem('viewMethod')
}



export function updateViewMethod(updatedViewMethod) {
    localStorage.setItem('viewMethod', updatedViewMethod)
}



export function getSortMethod() {
    return localStorage.getItem('sortMethod')
}



export function updateSortMethod(updatedSortMethod){
    localStorage.setItem('sortMethod', updatedSortMethod)
}



export function getReadFilter() {
    return localStorage.getItem('readFilter')
}



export function updateReadFilter(updatedReadFilter) {
    localStorage.setItem('readFilter', updatedReadFilter)
}


// LIBRARY HAS BOOKS
// -----------------------
// 
// Check if localStorage.bookstack exists and if it has any books, return true or false
//
// -----------------------


export function libraryHasBooks(library=false) {

    // Check if bookstack is set in local storage
    if ( !getLibrary() ) return false

    // Check if bookstack is set in local storage but no books exist
    if ( getLibrary().length === 0
    ) return false

    //Check if local storage exists but library state is false (search results)
    if (library && library.length === 0) return false 
    
    // Books exist in local storage
    return true
}







// CHECK USER SETTINGS
// -----------------------
// 
// Make sure user settings are set in local storage before page render. If not, store default values
//
// -----------------------

export function checkUserSettings() {

    if(!localStorage.bookstack) 
        localStorage.setItem('bookstack', JSON.stringify([]))

    if(!localStorage.readFilter) 
        localStorage.setItem('readFilter', 'all')
    
    if(!localStorage.sortMethod) 
        localStorage.setItem('sortMethod', 'title')

    if(!localStorage.viewMethod) 
        localStorage.setItem('viewMethod', 'grid')

}


//Add Book

export async function addBook(event) {

    event.preventDefault()

    const isbn = event.target[0].value
    const read = (event.target[1].value === "true") ? true : false
    const id = Math.random().toString(16).slice(2)
    const date = new Date().valueOf()

    const book = await getGoogleBookInfo(isbn)

        if(!book) {
        return 'error'
    }

    let imgLink
    try { imgLink = book.imageLinks.thumbnail }
    catch( error ) { imgLink = false }

    const newBook = {
            title : book.title,
            author : book.authors[0],
            pages : book.pageCount,
            image : imgLink,
            isbn : isbn,
            read,
            date,
            id
    }

    return newBook
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






// SEARCH BOOKS
// -----------------------
// 
// Search through localstorage and return books containing a phrase
//
// -----------------------

export function searchBooks(event) {

    let query = event.target.value.toLowerCase()

    const localStorageLibrary = getLibrary()
    const searchResults = localStorageLibrary.filter((book) => {

        let bookTitle = book.title.toLowerCase()
        let bookAuthor = book.author.toLowerCase()
      
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


export function applyUserOptions(updatedLibrary, readFilter, sortMethod, ) {

    if (readFilter === 'read')
        updatedLibrary = updatedLibrary.filter( book => book.read === true )
    
    if (readFilter === 'unread')
        updatedLibrary = updatedLibrary.filter( book => book.read === false )

    switch (sortMethod) {
        case 'newToOld':
        case 'oldToNew':
            updatedLibrary.sort((a, b) => {
                if (a.date === b.date) { return 0 }
                else { return (a.date < b.date) ? -1 : 1 }
            })
            break;
        case 'title':
            updatedLibrary.sort((a, b) => {
                if (a.title.toLowerCase() === b.title.toLowerCase()) { return 0 }
                else { return (a.title.toLowerCase() < b.title.toLowerCase()) ? -1 : 1 }
            })
            break;
        case 'author':
            updatedLibrary.sort((a, b) => {
                if (a.author.toLowerCase() === b.author.toLowerCase()) { return 0 }
                else { return (a.author.toLowerCase() < b.author.toLowerCase()) ? -1 : 1 }
            })
            break;
        default:
    }
    if (sortMethod === 'newToOld') updatedLibrary.reverse()

    return updatedLibrary
    
}

