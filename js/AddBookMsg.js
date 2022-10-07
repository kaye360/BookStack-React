
import '../css/AddBookMsg.css'
import messageSuccess from '../img/message-success.svg'
import messageError from '../img/message-error.svg'

function AddBookMsg(props) {

    const success = props.newBookAdded !== 'error' ? true : false

    return(
        <div className='message-wrapper fade-out'>

            <div className={ success ? 'success-message' : 'error-message' }>

                <img 
                    src={ success ? messageSuccess : messageError } 
                    alt={ success ? messageSuccess : messageError } 
                />


                <div>
                    {!success && 'Book not found. Please enter a valid ISBN number.' }


                    { success &&
                    <>
                        { props.newBookAdded.title } was added to the library
                        <br />

                        <a 
                            href={`#${props.newBookAdded.id}`}
                            onClick={ () => { props.setNewBookAdded(false) } }
                        >View Book</a> 
                    </>
                    }

                    <br />

                    <button onClick={ () => { props.setNewBookAdded(false) } } className="close-message">Close</button>

                </div>

            </div>

        </div>
    )

}

export default AddBookMsg