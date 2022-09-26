import { deleteBook, getGoogleBookInfo } from "./utils"
import { imgNotAvailable } from "../img"




function Book({ bookData, display, readStatus, setLibrary, setPopupBook, setCurrentPopupBook}) {


    const {title, author, pages, date, isbn, image} = {...bookData[1]}
    const id = bookData[0]
    const bookImg = (image === '#') ? imgNotAvailable : image 

    async function handleMoreInfo(isbn) {
        const bookInfo = await getGoogleBookInfo(isbn)
    
   
        setCurrentPopupBook( bookInfo )
        setPopupBook( isbn )
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
                        { pages }
                    </div>
    
                    <div className='book read'>
                        { readStatus }
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
                <td className='book read'>{ readStatus }</td>
                <td>{ date }</td>
                <td>{ isbn }</td>
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