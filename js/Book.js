import { deleteBook, getBooks, getGoogleBookInfo } from "./utils"
import * as IMG from '../img'
import '../css/Book.css'




function Book({ bookData, display, readStatus, setLibrary, setPopupBook, setCurrentPopupBook}) {


    const {title, author, pages, isbn, image} = {...bookData[1]}
    const id = bookData[0]
    const bookImg = (image === '#') ? IMG.imgNotAvailable : image 





    async function handleMoreInfo(isbn) {
        const bookInfo = await getGoogleBookInfo(isbn)
    
   
        setCurrentPopupBook( bookInfo )
        setPopupBook( isbn )
    }





    function toggleReadStatus(id, readStatus) {
        // console.log(id, readStatus, library)

        let library = getBooks()

        const book = library.findIndex( (current, index) => {
            return library[index][0] === id
        })

        library[book][1].read = library[book][1].read ? false : true

        const libraryObj = Object.fromEntries(library)

        localStorage.setItem('bookstack', JSON.stringify(libraryObj))
        setLibrary(library)
    }
    





    if (display === 'grid') {
        
        return(
            <div className='book' id={ id }>
                <img src={ bookImg} alt='Book Cover' className='book-cover'/>
                
                <div className='book-content'>
    
                    <header>
                        <h2>{ title }</h2>
                        <h3>By: { author }</h3>
                    </header>
    
                    <div className='book-pages'>
                        Pages: { pages }
                    </div>
    
                    <div className='book-read'>
                        Read? 
                        <button onClick={ () => {
                            toggleReadStatus(id, readStatus)
                        } }>
                        <img src={ readStatus === 'Yes' ? IMG.BookIconRead : IMG.BookIconUnread } alt="Book Read" />
                        </button>
                    </div>
    
                    <div>
                        <button className="button-delete" onClick={ () => {
                            deleteBook( id )
                            setLibrary( 
                                Object.entries(
                                    JSON.parse(localStorage.bookstack)
                                )
                            )
                            }
                        }>Delete</button>
                    </div>

                    <div>
                        <button className="button-more-info" onClick={ () => {
                            handleMoreInfo(isbn)
                        } }>More Info</button>
                    </div>
    
                </div>
    
            </div>
            
        )

    }





    if (display === 'table') {

        return(

            <tr id={ id }>
                <td><img src={ bookImg } alt='Book Cover' className='book-cover'/></td>
                <td>{ title }</td>
                <td>{ author }</td>
                <td className='book-pages'>{ pages }</td>
                <td className='book read'> 
                    <button onClick={ () => {
                            toggleReadStatus(id, readStatus)
                        } }>
                        <img src={ readStatus === 'Yes' ? IMG.BookIconRead : IMG.BookIconUnread } alt="Book Read" />
                    </button>
                </td>
                <td>

                <button className="button-more-info" onClick={ () => { handleMoreInfo(isbn) } }>
                    More Info
                </button>

                <button className="button-delete" onClick={ () => {
                            deleteBook( id )
                            setLibrary( 
                                Object.entries(
                                    JSON.parse(localStorage.bookstack)
                                )
                            )
                            }
                        }>Delete</button>
                </td>
            </tr>
        )

    }



    return "Error No ViewMethod Set"
}


export default Book