import { getGoogleBookInfo } from "./utils"
import * as IMG from '../img'
import '../css/Book.css'




function Book({ bookData, display, library, setLibrary, setBookInfoModalISBN, setBookInfoModalData}) {

    const {title, author, pages, read, isbn, image, id} = {...bookData}
    const bookImg = (image === false) ? IMG.imgNotAvailable : image 




    function deleteBook(id) {

        let updatedLibrary = [...library].filter( book => book.id !== id )

        setLibrary(updatedLibrary)
}



    async function handleMoreInfo(isbn) {
        const bookInfo = await getGoogleBookInfo(isbn)
        
        
        setBookInfoModalData( bookInfo )
        setBookInfoModalISBN( isbn )
    }





    function toggleReadStatus(id) {

        const updatedLibrary = [...library]

        const book = updatedLibrary.findIndex( (current, index) => {
            return updatedLibrary[index].id === id
        })

        updatedLibrary[book].read = !updatedLibrary[book].read


        setLibrary(updatedLibrary)
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
                        <button 
                          onClick={ () => { toggleReadStatus(id) } }
                        >
                            <img src={ read === true ? IMG.BookIconRead : IMG.BookIconUnread } alt="Book Read" />
                        </button>
                    </div>
    
                    <div>
                        <button 
                          className="button-delete mr1" 
                          onClick={ () => { deleteBook( id ) }
                        }> Delete</button>

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
                    <button 
                      onClick={ () => { toggleReadStatus(id) } }
                    >
                        <img src={ read === true ? IMG.BookIconRead : IMG.BookIconUnread } alt="Book Read" />
                    </button>
                </td>
                <td>

                <button className="button-more-info" onClick={ () => { handleMoreInfo(isbn) } }>
                    More Info
                </button>

                <button 
                  className="button-delete"
                  onClick={ () => { deleteBook( id ) }
                }>Delete</button>
                </td>
            </tr>
        )

    }



    return "Error No ViewMethod Set"
}


export default Book