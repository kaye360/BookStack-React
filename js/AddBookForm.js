
import { addBook } from './utils'
import { menuCloseIcon } from '../img'

export default function AddBookForm(props) {

    const {library, setLibrary, setNewBookAdded, setActiveMenuItem} = props


    const style = {
        display : 'flex',
        flexWrap : 'wrap',
        justifyContent : 'flex-end',
        marginBottom : '1rem',
        padding : '1rem',
        backgroundColor : 'var(--clr-primary-light)',
        textAlign : 'right',
        animation : 'slide-down 500ms ease-in-out both',
    }

    const formStyle = {
        width : '100%',
    }

    const addBookBarStyle = {
        width : '100%',
        maxWidth : '300px',
        padding : '0.5rem 1rem',
        marginBlock : '0.5rem',
    }

    const addBookBtnStyle = {
        padding : '0.5rem 1rem',
        backgroundColor : 'var(--clr-primary)',
        color : '#fff',
        fontWeight : 'bold',
    }
    
    const selectStyle = {
        padding : '0.5rem 1rem',
    }

    async function handleAddBook (event) {

        let newBook = await addBook(event)
        let updatedLibrary = [...library]
        updatedLibrary.push(newBook)    
        
        if (newBook !== 'error') setLibrary(updatedLibrary)

        setNewBookAdded(newBook)
        setTimeout( () => { setNewBookAdded(false) }, 5000)
      }

    return(
        <div style={ style } className="container">

                        
            <button onClick={ () => setActiveMenuItem(false) } style={ {width : '100%', textAlign : 'right'} } >
              <img src={ menuCloseIcon } alt="Close Menu" />
            </button>

            <div style={ formStyle } >
            
                <form onSubmit={ (event) => handleAddBook(event) } >
                    <label>
                        Book ISBN: &nbsp;
                        <input type="text" name="newbook" style={ addBookBarStyle } /> &nbsp;
                    </label>
                    <label>
                        Read? &nbsp;
                        <select style={ selectStyle }>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select> &nbsp;
                    </label>

                    <button type="submit" value="Add Book" style={ addBookBtnStyle } >
                        Add
                    </button>
                </form>

            </div>

        </div>
    )
}