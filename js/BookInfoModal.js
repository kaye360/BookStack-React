import RatingStars from "./RatingStars"


function BookInfoModal(props) {

    
    const author = props.bookInfoModalData.authors
    const title = props.bookInfoModalData.title
    const rating = props.bookInfoModalData.averageRating
    const ratingCount = props.bookInfoModalData.ratingsCount
    const topic = props.bookInfoModalData.categories
    const description = props.bookInfoModalData.description
    const imageURL = props.bookInfoModalData.imageLinks.smallThumbnail
    const pages = props.bookInfoModalData.pageCount
    const datePublished = props.bookInfoModalData.publishedDate
    
    


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
                        props.setBookInfoModalISBN(false)
                        props.setBookInfoModalData(false)
                    }}
                >
                    Close
                </button>

        </div>

    </div>

    
    
    )
    
}

export default BookInfoModal
