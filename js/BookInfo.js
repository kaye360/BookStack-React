import RatingStars from "./RatingStars"


function BookInfo(props) {


    
    const author = props.currentPopupBook.authors
    const title = props.currentPopupBook.title
    const rating = props.currentPopupBook.averageRating
    const ratingCount = props.currentPopupBook.ratingsCount
    const topic = props.currentPopupBook.categories
    const description = props.currentPopupBook.description
    const imageURL = props.currentPopupBook.imageLinks.smallThumbnail
    const pages = props.currentPopupBook.pageCount
    const datePublished = props.currentPopupBook.publishedDate
    
    


    return (
    
    <div className="more-info-background border">
        <div className="more-info-container">

            <div className="more-info-left">
                <h2>{ title }</h2>

                <h4 className="mb1">{ author }</h4>

                <img src={ imageURL } alt="Book Cover" className="more-info-cover mb2" />

                <RatingStars rating={rating} />

                <span> { !ratingCount ? 0 : ratingCount } total votes</span>
                
            </div>

            <div className="more-info-right">
                <p className="mb2">
                    <span className="more-info-category">Topic: { topic }</span><br />
                    <span className="more-info-pages">{ pages } pages</span>
                </p>

                <h4>Description</h4>
                <p className="mb3">
                    { description }
                </p>

                <p className="mb2">
                    Published on { datePublished }
                </p>

            </div>

                <button 
                    className="close-more-info"
                    onClick={ () => {
                        props.setPopupBook(false)
                        props.setCurrentPopupBook(false)
                    }}
                >
                    Close
                </button>

        </div>

    </div>

    
    
    )
    
}

export default BookInfo
