import * as IMG from '../img/RatingStars.js'


function RatingStars({rating}) {

    
    
    
    const style = {
        marginTop : '2rem',
        marginBottom : '1rem',
        fontWeight : '600'
    }
    
    if(!rating) {
        return (
            <div style={ style }>
                No Rating Available
            </div>
        )
    }

    let i = 1
    let stars = []
    let starsFull = 0
    let starsHalf = 0
    let starsEmpty = 0

    //Figure out how many full stars
    starsFull = Math.floor(rating)

    for (i; i <= starsFull; i++) {
        stars[i] = <img src={ IMG.starFull } alt="Full Star" key={i} />
    }

    //Figure out if half star
    if(!Number.isInteger(rating)) {
        starsHalf = 1;

        i++
        stars[i] = <img src={ IMG.starHalf } alt="Half Star" key={i} />
    } 


    //Figure out how many remaining and display as empty
    starsEmpty = 5 - starsFull -starsHalf

    for (let j=1; j <= starsEmpty; j++ ) {
        i++
        stars[i] = <img src={ IMG.starEmpty } alt="Empty Star" key={i} />
    }

    return(
        <div style={ style }>
            Rating: { rating }<br />  

            {stars}

        </div>
    )
}

export default RatingStars