
import { useEffect } from 'react'
import * as IMG from '../img'


export default function Menu(props) {

    const { activeMenuItem, setActiveMenuItem, setSearchResults } = props

    // If we close search bar, reset the library
    useEffect( () => {
        if (activeMenuItem !== 'search') setSearchResults(false)
    }, [activeMenuItem, setSearchResults])
   
    const style = {
        display : 'flex',
    }

    const btnStyle = {
     marginLeft : '1rem',   
    }

    return (    
        <div style={ style }>
            <button onClick={ () => setActiveMenuItem(activeMenuItem !== 'settings' ? 'settings' : false) } style={ btnStyle } >
                <img src={ IMG.menuSettingsIcon } alt="Settings" />
            </button>

            <button onClick={ () => setActiveMenuItem(activeMenuItem !== 'add' ? 'add' : false) } style={ btnStyle } >
                <img src={ IMG.menuAddIcon } alt="Add Book" />
            </button>

            <button onClick={ () => setActiveMenuItem(activeMenuItem !== 'search' ? 'search' : false) } style={ btnStyle } >
                <img src={ IMG.menuSearchIcon } alt="Search Library" />
            </button>

        </div>
    )
}